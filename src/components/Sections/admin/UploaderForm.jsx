import { useEffect, useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import CreatableSelect from 'react-select/creatable';

const ImageUploadForm = () => {
    const [image, setImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(false);

    const [availableTags, setAvailableTags] = useState([])

    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file) {
            setImage(URL.createObjectURL(file));
            setImageFile(file);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: 'image/*' });

    const handleRemoveImage = () => {
        setImage(null);
    };

    const handleTagsChange = (newValue) => {
        setTags(newValue);
    };
    useEffect(() => {
        fetch('https://utility.caclouddesk.com/api/infographics/tags')
            .then((response) => response.json())
            .then((data) => {
                setAvailableTags(data.map((tag) => ({ value: tag, label: tag })));
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        if (!imageFile) {
            toast.error('Please upload an image');
            setLoading(false);
            return;
        }
        if (!title) {
            toast.error('Please enter a title');
            setLoading(false);
            return;
        }
        if (!description) {
            toast.error('Please enter a description');
            setLoading(false);
            return;
        }
        if (tags.length === 0) {
            toast.error('Please select at least one category');
            setLoading(false);
            return;
        }
        formData.append('image', imageFile);
        formData.append('title', title);
        formData.append('description', description);
        let tp = tags.map((tag) => tag.value);
        formData.append('tags', tp );
        console.log(formData.getAll('tags')); 
        fetch('https://utility.caclouddesk.com/api/infographics/upload', {
            method: 'POST',
            body: formData,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
            },
        })
            .then((response) => response.json())
            .then(() => {
                toast.success('Infographic uploaded successfully');
                setImage(null);
                setTitle('');
                setDescription('');
                setTags([]);
                setLoading(false);
            })
            .then(() => window.location.reload())
            .catch((error) => {
                setLoading(false);
                toast.error('Error uploading infographic');
                console.error('Error:', error);
            });
    };

    return (
        <div className="m-6 p-4 bg-white rounded-md shadow-md">
            <form onSubmit={handleSubmit} className="flex justify-center items-center max-h-[90vh]">
                <div className='w-1/2 overflow-hidden'>
                    <div className="flex flex-col space-y-2 o">
                        <label className="text-xl font-medium ml-10 uppercase text-[#31AACC]">Upload Infographics</label>
                        {!image ? (
                            <div
                                {...getRootProps()}
                                className="border-dashed border-2 h-96 m-10 flex flex-col justify-center items-center border-gray-300 rounded-md p-4 cursor-pointer"
                            >
                                <input {...getInputProps()} />
                                {isDragActive ? (
                                    <p className="text-gray-800 p-5 rounded-3xl">Drop the files here...</p>
                                ) : (
                                    <p className="text-gray-800 p-5 rounded-3xl">Drag & drop or click to upload</p>
                                )}
                            </div>
                        ) : (
                            <div className="relative m-auto h-full">
                                <img src={image} alt="Preview" className=" h-96 rounded-md" />
                                <button
                                    type="button"
                                    onClick={handleRemoveImage}
                                    className="font-bold w-full my-3 bg-blue-500 text-white p-1 rounded-full"
                                >
                                    Remove Image
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <div className='w-1/2 space-y-3'>
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="title" className="text-sm font-medium">Title</label>
                        <input
                            type="text"
                            id="title"
                            className="border rounded-md p-2"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            name='title'
                            required
                        />
                    </div>

                    <div className="flex flex-col space-y-2">
                        <label htmlFor="description" className="text-sm font-medium">Description</label>
                        <textarea
                            id="description"
                            className="border rounded-md p-2"
                            name='description'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            maxLength={80}
                            required
                        />
                    </div>

                    <div className="flex flex-col space-y-2">
                        <label htmlFor="tags" className="text-sm font-medium">Categories</label>
                        <CreatableSelect
                            isMulti
                            options={availableTags || []}
                            value={tags}
                            onChange={handleTagsChange}
                            className="border rounded-md p-2"
                            name='tags'
                        />
                    </div>

                    <button
                        type="submit"
                        className={`w-full bg-[#31AACC] text-white p-2 rounded-md` + (loading ? ' opacity-50 cursor-not-allowed' : '')}
                        disabled={loading}
                    >
                        Submit
                    </button>
                    <div>
                        NOTE:<br />
                        Please upload images with a 1:1 aspect ratio. <br />
                        Preferred resolution is 1080x1080 pixels. <br />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ImageUploadForm;
