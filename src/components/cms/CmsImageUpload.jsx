import React, { useState, useRef } from 'react';
import { Upload, X, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';

const ALLOWED_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp', 'gif'];
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

export default function CmsImageUpload({
  label = 'Featured Image',
  value = '',
  onChange,
  required = false,
  helperText
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const validateFile = (file) => {
    if (!file) return 'No file selected.';

    const ext = file.name.split('.').pop()?.toLowerCase();
    const isMimeValid = ALLOWED_MIME_TYPES.includes(file.type);
    const isExtValid = ext && ALLOWED_EXTENSIONS.includes(ext);

    if (!isMimeValid && !isExtValid) {
      return 'Unsupported file format. Please upload a JPEG, PNG, WebP, or GIF image.';
    }

    if (file.size > MAX_FILE_SIZE) {
      return `File size (${(file.size / (1024 * 1024)).toFixed(1)} MB) exceeds the 5MB limit. Please choose a smaller image.`;
    }

    return null;
  };

  const uploadFile = async (file) => {
    setError('');
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        credentials: 'same-origin',
        body: formData
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.error || 'Failed to upload image. Please try again.');
      }

      if (data.url) {
        onChange(data.url);
      } else {
        throw new Error('Upload succeeded but no image URL was returned.');
      }
    } catch (err) {
      setError(err.message || 'Image upload failed.');
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadFile(file);
    }
    // Reset file input value so selecting the same file again triggers onChange
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      uploadFile(file);
    }
  };

  const removeImage = () => {
    setError('');
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full">
      {label && (
        <label className="cms-label" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span>
            {label}
            {required && <span style={{ color: '#b91c1c', marginLeft: '4px' }}>*</span>}
          </span>
          {value && (
            <span style={{ fontSize: '11px', fontWeight: 600, color: '#16a34a', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <CheckCircle2 style={{ height: '13px', width: '13px' }} />
              Image Assigned
            </span>
          )}
        </label>
      )}

      {/* Hidden native file input */}
      <input
        ref={fileInputRef}
        id="cms-image-file-input"
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={handleFileChange}
        style={{ display: 'none' }}
        disabled={uploading}
      />

      {/* Active assigned image preview card */}
      {value ? (
        <div
          style={{
            position: 'relative',
            border: '1px solid #cbd5e1',
            borderRadius: '10px',
            backgroundColor: '#f8fafc',
            overflow: 'hidden',
            padding: '12px'
          }}
        >
          <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
            <div
              style={{
                width: '120px',
                height: '80px',
                borderRadius: '8px',
                overflow: 'hidden',
                backgroundColor: '#0f172a',
                flexShrink: 0,
                border: '1px solid #e2e8f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <img
                src={value}
                alt="Article Featured"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <p
                style={{
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#1e293b',
                  margin: 0,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
                title={value}
              >
                {value.split('/').pop() || 'Featured Image'}
              </p>
              <p style={{ fontSize: '12px', color: '#64748b', margin: '2px 0 8px 0' }}>
                Stored &amp; ready to publish
              </p>

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="cms-btn cms-btn-sm"
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #cbd5e1',
                    color: '#334155',
                    fontSize: '12px',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    cursor: 'pointer'
                  }}
                >
                  <RefreshCw style={{ height: '12px', width: '12px' }} />
                  Replace Image
                </button>

                <button
                  type="button"
                  onClick={removeImage}
                  disabled={uploading}
                  className="cms-btn cms-btn-sm"
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #fecaca',
                    color: '#dc2626',
                    fontSize: '12px',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    cursor: 'pointer'
                  }}
                >
                  <X style={{ height: '12px', width: '12px' }} />
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Empty Dropzone / Upload Box */
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => !uploading && fileInputRef.current?.click()}
          style={{
            border: `2px dashed ${dragActive ? '#0284c7' : '#cbd5e1'}`,
            borderRadius: '10px',
            backgroundColor: dragActive ? '#f0f9ff' : '#f8fafc',
            padding: '24px 16px',
            textAlign: 'center',
            cursor: uploading ? 'wait' : 'pointer',
            transition: 'all 0.15s ease'
          }}
        >
          {uploading ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <svg className="animate-spin h-6 w-6" style={{ color: '#075985' }} fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <p style={{ fontSize: '13px', fontWeight: 600, color: '#334155', margin: 0 }}>
                Uploading image to storage…
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: '#e0f2fe',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#075985',
                  marginBottom: '2px'
                }}
              >
                <Upload style={{ height: '20px', width: '20px' }} />
              </div>
              <p style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                Click to upload <span style={{ fontWeight: 400, color: '#64748b' }}>or drag and drop</span>
              </p>
              <p style={{ fontSize: '11px', color: '#64748b', margin: 0 }}>
                JPEG, PNG, WebP, or GIF (max 5MB)
              </p>
            </div>
          )}
        </div>
      )}

      {/* Upload or Validation Error */}
      {error && (
        <div
          role="alert"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            color: '#b91c1c',
            fontSize: '12px',
            marginTop: '6px',
            fontWeight: 500
          }}
        >
          <AlertCircle style={{ height: '14px', width: '14px', flexShrink: 0 }} />
          <span>{error}</span>
        </div>
      )}

      {helperText && !error && (
        <p className="cms-muted" style={{ marginTop: '4px', fontSize: '12px' }}>
          {helperText}
        </p>
      )}
    </div>
  );
}
