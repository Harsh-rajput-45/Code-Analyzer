import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { X, Check } from 'lucide-react';

const ImageCropper = ({ imageSrc, onCropComplete, onCancel }) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const onCropChange = (crop) => {
        setCrop(crop);
    };

    const onZoomChange = (zoom) => {
        setZoom(zoom);
    };

    const onCropAreaChange = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const createImage = (url) =>
        new Promise((resolve, reject) => {
            const image = new Image();
            image.addEventListener('load', () => resolve(image));
            image.addEventListener('error', (error) => reject(error));
            image.setAttribute('crossOrigin', 'anonymous'); // needed to avoid cross-origin issues on CodeSandbox
            image.src = url;
        });

    const getCroppedImg = async (imageSrc, pixelCrop) => {
        const image = await createImage(imageSrc);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) {
            return null;
        }

        // set canvas width to match the bounding box
        canvas.width = image.width;
        canvas.height = image.height;

        // draw image
        ctx.drawImage(image, 0, 0);

        // croppedAreaPixels values are bounding box relative
        // extract the cropped image using these values
        const data = ctx.getImageData(
            pixelCrop.x,
            pixelCrop.y,
            pixelCrop.width,
            pixelCrop.height
        );

        // set canvas width to final desired crop size - this will clear existing context
        canvas.width = pixelCrop.width;
        canvas.height = pixelCrop.height;

        // paste generated rotate image at the top left corner
        ctx.putImageData(data, 0, 0);

        // As Base64 string
        return canvas.toDataURL('image/jpeg');
    };

    const handleSave = async () => {
        try {
            const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
            onCropComplete(croppedImage);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 100,
            background: 'rgba(0,0,0,0.85)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <div style={{
                position: 'relative',
                width: '90%',
                maxWidth: '600px',
                height: '60vh',
                background: '#333',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                marginBottom: '1rem'
            }}>
                <Cropper
                    image={imageSrc}
                    crop={crop}
                    zoom={zoom}
                    aspect={1}
                    onCropChange={onCropChange}
                    onCropComplete={onCropAreaChange}
                    onZoomChange={onZoomChange}
                    cropShape="round"
                    showGrid={false}
                />
            </div>

            <div style={{ display: 'flex', gap: '1rem', width: '90%', maxWidth: '600px', alignItems: 'center' }}>
                <div style={{ flex: 1 }}>
                    <label style={{ color: 'white', display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Zoom</label>
                    <input
                        type="range"
                        value={zoom}
                        min={1}
                        max={3}
                        step={0.1}
                        aria-labelledby="Zoom"
                        onChange={(e) => {
                            setZoom(e.target.value)
                        }}
                        style={{ width: '100%', cursor: 'pointer' }}
                    />
                </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                <button
                    onClick={onCancel}
                    className="hover-scale"
                    style={{
                        background: 'var(--bg-tertiary)',
                        color: 'white',
                        border: 'none',
                        padding: '0.75rem 1.5rem',
                        borderRadius: 'var(--radius-full)',
                        fontWeight: '600',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}
                >
                    <X size={20} /> Cancel
                </button>
                <button
                    onClick={handleSave}
                    className="hover-scale"
                    style={{
                        background: 'var(--primary)',
                        color: 'white',
                        border: 'none',
                        padding: '0.75rem 1.5rem',
                        borderRadius: 'var(--radius-full)',
                        fontWeight: '600',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}
                >
                    <Check size={20} /> Save Profile Picture
                </button>
            </div>
        </div>
    );
};

export default ImageCropper;
