import React, { useState, useEffect } from 'react';

const Product = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        productName: '',
        productCategory: '',
        productSubCategory1: '',
        productSubCategory2: '',
        price: '',
        description: '',
        quantity: '',
        gst: '',
        minPurchase: '',
        documentLinks: [''], // Initialize with one empty link field
        location: ''
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        // Clear errors when changing steps
        setErrors({});
    }, [currentStep]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleLinkChange = (index, e) => {
        const newLinks = [...formData.documentLinks];
        newLinks[index] = e.target.value;
        setFormData({ ...formData, documentLinks: newLinks });
    };

    const addLinkField = () => {
        setFormData({ ...formData, documentLinks: [...formData.documentLinks, ''] });
    };

    const removeLinkField = (index) => {
        const newLinks = formData.documentLinks.filter((_, i) => i !== index);
        setFormData({ ...formData, documentLinks: newLinks });
    };

    const validateStep = () => {
        let isValid = true;
        const newErrors = {};

        switch (currentStep) {
            case 1:
                if (!formData.productName.trim()) {
                    newErrors.productName = 'Product Name is required';
                    isValid = false;
                }
                if (!formData.productCategory.trim()) {
                    newErrors.productCategory = 'Product Category is required';
                    isValid = false;
                }
                if (!formData.productSubCategory1.trim()) {
                    newErrors.productSubCategory1 = 'product SubCategory1 is required. Put 0 if not applicable';
                    isValid = false;
                }
                if (!formData.productSubCategory2.trim()) {
                    newErrors.productSubCategory2 = 'product SubCategory2 is required. Put 0 if not applicable';
                    isValid = false;
                }
                if (!formData.price || isNaN(formData.price) || formData.price <= 0) {
                    newErrors.price = 'Valid Price is required';
                    isValid = false;
                }
                if (formData.documentLinks.some(link => !link.trim())) {
                    newErrors.documentLinks = 'All document links must be filled out';
                    isValid = false;
                }
                break;
            case 2:
                if (!formData.description.trim()) {
                    newErrors.description = 'Description is required';
                    isValid = false;
                }
                if (!formData.quantity || isNaN(formData.quantity) || formData.quantity <= 0) {
                    newErrors.quantity = 'Valid Quantity is required';
                    isValid = false;
                }
                if (!formData.location.trim()) {
                    newErrors.location = 'Location is required';
                    isValid = false;
                }
                break;
            case 3:
                if (!formData.gst || isNaN(formData.gst) || formData.gst < 0) {
                    newErrors.gst = 'Valid GST is required';
                    isValid = false;
                }
                if (!formData.minPurchase || isNaN(formData.minPurchase) || formData.minPurchase <= 0) {
                    newErrors.minPurchase = 'Valid Minimum Purchase is required';
                    isValid = false;
                }
                break;
            default:
                break;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleStepChange = (step) => {
        // If moving forward, validate the current step
        if (step > currentStep) {
            if (validateStep()) {
                setCurrentStep(step);
            }
        } else {
            // Moving backward, always allow
            setCurrentStep(step);
        }
    };

    const handleSubmit = () => {
        if (validateStep()) {
            // Submit form data
            console.log('Form Data Submitted:', formData);
        }
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="space-y-4">
                        <div className="flex flex-col">
                            <label className="font-semibold mb-1" htmlFor="productName">Product Name</label>
                            <input
                                id="productName"
                                type="text"
                                name="productName"
                                value={formData.productName}
                                onChange={handleChange}
                                className="p-2 border border-gray-300 rounded"
                                placeholder="Product Name"
                                aria-describedby="productNameError"
                            />
                            {errors.productName && <p id="productNameError" className="text-red-500 text-sm">{errors.productName}</p>}
                        </div>

                        <div className="flex flex-col">
                            <label className="font-semibold mb-1" htmlFor="productCategory">Product Category</label>
                            <input
                                id="productCategory"
                                type="text"
                                name="productCategory"
                                value={formData.productCategory}
                                onChange={handleChange}
                                className="p-2 border border-gray-300 rounded"
                                placeholder="Product Category"
                                aria-describedby="productCategoryError"
                            />
                            {errors.productCategory && <p id="productCategoryError" className="text-red-500 text-sm">{errors.productCategory}</p>}
                        </div>

                        <div className="flex flex-col">
                            <label className="font-semibold mb-1" htmlFor="productCategory">Product Sub-Category-1</label>
                            <input
                                id="productSubCategory1"
                                type="text"
                                name="productSubCategory1"
                                value={formData.productSubCategory1}
                                onChange={handleChange}
                                className="p-2 border border-gray-300 rounded"
                                placeholder="Product Category"
                                aria-describedby="productSubCategoryError1"
                            />
                            {errors.productSubCategory1 && <p id="productCategoryError" className="text-red-500 text-sm">{errors.productSubCategory1}</p>}
                        </div>

                        <div className="flex flex-col">
                            <label className="font-semibold mb-1" htmlFor="productCategory">Product Sub-Category-2</label>
                            <input
                                id="productSubCategory2"
                                type="text"
                                name="productSubCategory2"
                                value={formData.productSubCategory2}
                                onChange={handleChange}
                                className="p-2 border border-gray-300 rounded"
                                placeholder="Product Category"
                                aria-describedby="productSubCategoryError2"
                            />
                            {errors.productSubCategory2 && <p id="productCategoryError" className="text-red-500 text-sm">{errors.productSubCategory2}</p>}
                        </div>

                        <div className="flex flex-col">
                            <label className="font-semibold mb-1" htmlFor="price">Price</label>
                            <input
                                id="price"
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                className="p-2 border border-gray-300 rounded"
                                placeholder="Price"
                                aria-describedby="priceError"
                            />
                            {errors.price && <p id="priceError" className="text-red-500 text-sm">{errors.price}</p>}
                        </div>
                        <div className="flex flex-col">
                            <label className="font-semibold mb-1">Document Links</label>
                            {formData.documentLinks.map((link, index) => (
                                <div key={index} className="flex items-center mb-2">
                                    <input
                                        type="text"
                                        value={link}
                                        onChange={(e) => handleLinkChange(index, e)}
                                        className="p-2 border border-gray-300 rounded mr-2"
                                        placeholder="Document Link"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeLinkField(index)}
                                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={addLinkField}
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                Add Link
                            </button>
                            {errors.documentLinks && <p className="text-red-500 text-sm">{errors.documentLinks}</p>}
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="space-y-4">
                        <div className="flex flex-col">
                            <label className="font-semibold mb-1" htmlFor="description">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="p-2 border border-gray-300 rounded"
                                placeholder="Description"
                                aria-describedby="descriptionError"
                            />
                            {errors.description && <p id="descriptionError" className="text-red-500 text-sm">{errors.description}</p>}
                        </div>
                        <div className="flex flex-col">
                            <label className="font-semibold mb-1" htmlFor="quantity">Quantity</label>
                            <input
                                id="quantity"
                                type="number"
                                name="quantity"
                                value={formData.quantity}
                                onChange={handleChange}
                                className="p-2 border border-gray-300 rounded"
                                placeholder="Quantity"
                                aria-describedby="quantityError"
                            />
                            {errors.quantity && <p id="quantityError" className="text-red-500 text-sm">{errors.quantity}</p>}
                        </div>
                        <div className="flex flex-col">
                            <label className="font-semibold mb-1" htmlFor="location">Location</label>
                            <input
                                id="location"
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                className="p-2 border border-gray-300 rounded"
                                placeholder="Location"
                                aria-describedby="locationError"
                            />
                            {errors.location && <p id="locationError" className="text-red-500 text-sm">{errors.location}</p>}
                        </div>
                        <div className="flex flex-col">
                            <label className="font-semibold mb-1" htmlFor="shipping">Shipping Required</label>
                            <div className='flex flex-row gap-8'>
                                <button className='bg-sky-100 px-5 rounded py-2'>Yes</button>
                                <button className='bg-sky-100 px-5 rounded py-2'>No</button>
                            </div>
                            {errors.location && <p id="locationError" className="text-red-500 text-sm">{errors.location}</p>}
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className="space-y-4">
                        <div className="flex flex-col">
                            <label className="font-semibold mb-1" htmlFor="gst">GST</label>
                            <input
                                id="gst"
                                type="number"
                                name="gst"
                                value={formData.gst}
                                onChange={handleChange}
                                className="p-2 border border-gray-300 rounded"
                                placeholder="GST"
                                aria-describedby="gstError"
                            />
                            {errors.gst && <p id="gstError" className="text-red-500 text-sm">{errors.gst}</p>}
                        </div>
                        <div className="flex flex-col">
                            <label className="font-semibold mb-1" htmlFor="minPurchase">Minimum Purchase</label>
                            <input
                                id="minPurchase"
                                type="number"
                                name="minPurchase"
                                value={formData.minPurchase}
                                onChange={handleChange}
                                className="p-2 border border-gray-300 rounded"
                                placeholder="Minimum Purchase"
                                aria-describedby="minPurchaseError"
                            />
                            {errors.minPurchase && <p id="minPurchaseError" className="text-red-500 text-sm">{errors.minPurchase}</p>}
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="w-full mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold mb-6 text-center">New Product Add Form</h2>
            <div className="flex justify-between mb-6">
                <button
                    type="button"
                    onClick={() => handleStepChange(1)}
                    className={`px-4 py-2 rounded ${currentStep === 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}
                >
                    General
                </button>
                <button
                    type="button"
                    onClick={() => handleStepChange(2)}
                    className={`px-4 py-2 rounded ${currentStep === 2 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}
                >
                    Main Information
                </button>
                <button
                    type="button"
                    onClick={() => handleStepChange(3)}
                    className={`px-4 py-2 rounded ${currentStep === 3 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}
                >
                    Links
                </button>
            </div>
            {renderStep()}
            {currentStep < 3 && (
                <div className="flex justify-center mt-6">
                    <button
                        type="button"
                        onClick={() => handleStepChange(currentStep + 1)}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Next
                    </button>
                </div>
            )}
            {currentStep === 3 && (
                <div className="flex justify-center mt-6">
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                        Submit
                    </button>
                </div>
            )}
        </div>
    );
};

export default Product;
