import React, { useState, useEffect } from 'react';
import axios from 'axios'

const Product = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [prodImg, setProdImg] = useState()
    const [formData, setFormData] = useState({
        productName: '',
        productCategory: '',
        productSubCategory1: '',
        productSubCategory2: '',
        price: '',
        manufacturerName: '',
        description: '',
        quantity: '',
        gst: '',
        minPurchase: '',
        documentLinks: [''], // Initialize with one empty link field
        location: '',
        shipping: "No",
        weight: "",
        dimensions: {
            length: '',
            breadth: '',
            height: '',
        },
        faq: [{ question: '', answer: '' }],
        options: [{ name: '', quantity: '', stock: '', price: '', weight: '' }],

    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        // Clear errors when changing steps
        setErrors({});
    }, [currentStep]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (['length', 'breadth', 'height'].includes(name)) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                dimensions: {
                    ...prevFormData.dimensions,
                    [name]: value,
                },
            }));
        } else {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value,
            }));
        }
    };

    const handleFAQchange = (index, event) => {
        const { name, value } = event.target

        const newFAQs = [...formData.faq]
        newFAQs[index][name] = value;
        setFormData({ ...formData, faq: newFAQs })
    }

    const handleOptionChange = (index, event) => {
        const { name, value } = event.target

        const newoptions = [...formData.options]
        newoptions[index][name] = value;
        setFormData({ ...formData, options: newoptions })
    }

    const addProduct = () => {
        const newOptions = [...formData.options, { name: '', quantity: '', stock: '', price: '', weight: '' }]
        setFormData({ ...formData, options: newOptions })
    };

    const removeProduct = (index) => {
        const newOptions = formData.options.filter((_, i) => i !== index);
        setFormData({ ...formData, options: newOptions });
    };

    const productImageHnd = (e) => {
        setProdImg(e.target.files)
    }

    // Function to add a new FAQ item
    const addFaq = () => {
        const newFaq = [...formData.faq, { question: '', answer: '' }]
        setFormData({ ...formData, faq: newFaq });
    };

    // Function to remove a FAQ item
    const removeFaq = (index) => {
        const newFaqs = formData.faq.filter((_, i) => i !== index);
        setFormData({ ...formData, faq: newFaqs })
    };

    const handleChange2 = (val) => {
        let name = "shipping"

        setFormData({ ...formData, [name]: val });
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
                if (!formData.manufacturerName.trim()) {
                    newErrors.manufacturerName = 'Valid manufacturer Name is required';
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
                if (!formData.weight.trim()) {
                    newErrors.weight = 'Weight is required';
                    isValid = false;
                }
                if (!formData.dimensions.length.trim() || !formData.dimensions.breadth.trim() || !formData.dimensions.height.trim()) {
                    newErrors.dimension = 'dimension is required';
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
                formData.faq.forEach((item, index) => {
                    if (!item.question.trim()) {
                        newErrors[`faq_${index}_question`] = `Question is required for FAQ entry ${index + 1}`;
                        isValid = false;
                    }
                    if (!item.answer.trim()) {
                        newErrors[`faq_${index}_answer`] = `Answer is required for FAQ entry ${index + 1}`;
                        isValid = false;
                    }
                });
                break;
            case 4:
                formData.options.forEach((option, index) => {
                    if (!option.name.trim()) {
                        newErrors[`option_${index}_name`] = `Name is required for option entry ${index + 1}`;
                        isValid = false;
                    }
                    if (!option.quantity || isNaN(option.quantity) || option.quantity < 0) {
                        newErrors[`option_${index}_quantity`] = `Valid quantity is required for option entry ${index + 1}`;
                        isValid = false;
                    }
                    if (!option.stock || isNaN(option.stock) || option.stock < 0) {
                        newErrors[`option_${index}_stock`] = `Valid stock is required for option entry ${index + 1}`;
                        isValid = false;
                    }
                    if (!option.price || isNaN(option.price) || option.price <= 0) {
                        newErrors[`option_${index}_price`] = `Valid price is required for option entry ${index + 1}`;
                        isValid = false;
                    }
                    if (!option.weight || isNaN(option.weight) || option.weight < 0) {
                        newErrors[`option_${index}_weight`] = `Valid weight is required for option entry ${index + 1}`;
                        isValid = false;
                    }
                });
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

    const handleSubmit = async () => {
        if (validateStep()) {
            const formdata = new FormData()
            formdata.append('productName', formData.productName)
            formdata.append('productCategory', formData.productCategory)
            formdata.append('productSubCategory1', formData.productSubCategory1)
            formdata.append('productSubCategory2', formData.productSubCategory2)
            formdata.append('price', formData.price)
            formdata.append('manufacturerName', formData.manufacturerName)
            formdata.append('description', formData.description)
            formdata.append('quantity', formData.quantity)
            formdata.append('gst', formData.gst)
            formdata.append('minPurchase', formData.minPurchase)
            formdata.append('documentLinks', formData.documentLinks)
            formdata.append('location', formData.location)
            formdata.append('shipping', formData.shipping)
            formdata.append('weight', formData.weight)
            //formdata.append('dimensions', formData.dimensions)
            // Append each property of the dimensions object
            Object.entries(formData.dimensions).forEach(([key, value]) => {
                formdata.append(`dimensions[${key}]`, value);
            });
            // formdata.append('faq', formData.faq)
            formData.faq.forEach((faq, index) => {
                formdata.append(`faqs[${index}][question]`, faq.question);
                formdata.append(`faqs[${index}][answer]`, faq.answer);
            });
            formData.options.forEach((option, index) => {
                formdata.append(`options[${index}][name]`, option.name);
                formdata.append(`options[${index}][quantity]`, option.quantity);
                formdata.append(`options[${index}][stock]`, option.stock);
                formdata.append(`options[${index}][price]`, option.price);
                formdata.append(`options[${index}][weight]`, option.weight);
            });
            //            
            for (let i = 0; i < prodImg.length; i++) {
                formdata.append('prodImg', prodImg[i]);
            }


            try {
                const res = await axios.post('http://localhost:8000/admin/newProduct', formdata)
                if (res.status === 201) {
                    alert("Product added Successfully")
                }
                if (res.status === 400) {
                    alert("Missing required fields")
                }
            } catch (err) {


                alert("Network Issue. Please try again")

                console.log(err)
            }

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
                            <label className="font-semibold mb-1" htmlFor="manufacturerName">Manufacturer Name</label>
                            <input
                                id="manufacturerName"
                                type="text"
                                name="manufacturerName"
                                value={formData.manufacturerName}
                                onChange={handleChange}
                                className="p-2 border border-gray-300 rounded"
                                placeholder="Manufacturer Name"
                                aria-describedby="manufacturerNameError"
                            />
                            {errors.manufacturerName && <p id="manufacturerName" className="text-red-500 text-sm">{errors.manufacturerName}</p>}
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
                                <button onClick={() => { handleChange2("Yes") }} className={`${formData.shipping == "Yes" ? "bg-teal-500" : "bg-teal-200"} px-5 rounded py-2`}>Yes</button>
                                <button onClick={() => { handleChange2("No") }} className={` px-5  ${formData.shipping == "No" ? "bg-teal-500" : "bg-teal-200"} rounded py-2`}>No</button>
                            </div>
                            {errors.location && <p id="locationError" className="text-red-500 text-sm">{errors.location}</p>}
                        </div>

                        <div className="flex flex-col">
                            <label className="font-semibold mb-1" htmlFor="weight">Product Weight in grams</label>
                            <input
                                id="weight"
                                type="number"
                                name="weight"
                                value={formData.weight}
                                onChange={handleChange}
                                className="p-2 border border-gray-300 rounded"
                                placeholder="Weight in grams"
                                aria-describedby="weightError"
                            />
                            {errors.weight && <p id="weightError" className="text-red-500 text-sm">{errors.weight}</p>}
                        </div>

                        <div className="flex flex-col">
                            <label className="font-semibold mb-1" htmlFor="dimension">Product Dimensions</label>
                            <div className='flex flex-row gap-4'>
                                <input
                                    id="length"
                                    type="number"
                                    name="length"
                                    value={formData.dimensions.length}
                                    onChange={handleChange}
                                    className="p-2 border border-gray-300 rounded"
                                    placeholder="length in mm"
                                    aria-describedby="dimensionError"
                                />
                                <input
                                    id="breadth"
                                    type="number"
                                    name="breadth"
                                    value={formData.dimensions.breadth}
                                    onChange={handleChange}
                                    className="p-2 border border-gray-300 rounded"
                                    placeholder="breadth in mm"
                                    aria-describedby="dimensionError"
                                />
                                <input
                                    id="height"
                                    type="number"
                                    name="height"
                                    value={formData.dimensions.height}
                                    onChange={handleChange}
                                    className="p-2 border border-gray-300 rounded"
                                    placeholder="height in mm"
                                    aria-describedby="dimensionError"
                                />
                            </div>
                            {errors.dimension && <p id="dimensionError" className="text-red-500 text-sm">{errors.dimension}</p>}
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

                        {/* product img */}

                        <div className="flex flex-col">
                            <label className="font-semibold mb-1" htmlFor="productImage">Add Product Images</label>
                            <input
                                onChange={productImageHnd}
                                type="file"
                                multiple
                                accept="image/*"
                                name="prodImg"
                            />
                            {errors.minPurchase && <p id="minPurchaseError" className="text-red-500 text-sm">{errors.minPurchase}</p>}
                        </div>

                        {/* faqs */}

                        <div>
                            <label className="font-semibold mb-1" htmlFor="minPurchase">FAQs for Product</label>
                            {formData.faq.map((faq, index) => {
                                return <div key={index} className="space-y-2 flex flex-col md:flex-row items-start md:items-center md:space-y-2 md:space-x-4">
                                    <input
                                        type="text"
                                        name="question"
                                        placeholder="Question"
                                        value={faq.question}
                                        onChange={(event) => handleFAQchange(index, event)}
                                        className="flex-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                    {errors[`faq_${index}_question`] && (
                                        <p className="text-red-500 text-sm">{errors[`faq_${index}_question`]}</p>
                                    )}
                                    <input
                                        type="text"
                                        name="answer"
                                        placeholder="Answer"
                                        value={faq.answer}
                                        onChange={(event) => handleFAQchange(index, event)}
                                        className="flex-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                    {errors[`faq_${index}_question`] && (
                                        <p className="text-red-500 text-sm">{errors[`faq_${index}_question`]}</p>
                                    )}
                                    {formData.faq.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeFaq(index)}
                                            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                                        >
                                            Remove
                                        </button>

                                    )}
                                    <button
                                        type="button"
                                        onClick={addFaq}
                                        className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    >
                                        Add FAQ
                                    </button>
                                </div>
                            })}
                        </div>
                    </div>
                );
            // options
            case 4:
                return (
                    <div>
                        <label className="font-semibold mb-1" htmlFor="minPurchase">FAQs for Product</label>

                        {formData.options.map((product, index) => (
                            <div key={index} className="space-y-2 flex flex-col md:flex-row items-start md:items-center md:space-y-2 md:space-x-2">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Product Name"
                                    value={product.name}
                                    onChange={(event) => handleOptionChange(index, event)}
                                    className="flex-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                                {errors[`option_${index}_name`] && (
                                    <p className="text-red-500 text-sm">{errors[`option_${index}_name`]}</p>
                                )}
                                <input
                                    type="number"
                                    name="quantity"
                                    placeholder="Quantity"
                                    value={product.quantity}
                                    onChange={(event) => handleOptionChange(index, event)}
                                    className="flex-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                                {errors[`option_${index}_name`] && (
                                    <p className="text-red-500 text-sm">{errors[`option_${index}_name`]}</p>
                                )}
                                <input
                                    type="number"
                                    name="stock"
                                    placeholder="Stock"
                                    value={product.stock}
                                    onChange={(event) => handleOptionChange(index, event)}
                                    className="flex-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                                {errors[`option_${index}_name`] && (
                                    <p className="text-red-500 text-sm">{errors[`option_${index}_name`]}</p>
                                )}
                                <input
                                    type="number"
                                    name="price"
                                    placeholder="Price"
                                    value={product.price}
                                    onChange={(event) => handleOptionChange(index, event)}
                                    className="flex-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                                {errors[`option_${index}_name`] && (
                                    <p className="text-red-500 text-sm">{errors[`option_${index}_name`]}</p>
                                )}
                                <input
                                    type="number"
                                    name="weight"
                                    placeholder="Weight"
                                    value={product.weight}
                                    onChange={(event) => handleOptionChange(index, event)}
                                    className="flex-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                                {errors[`option_${index}_name`] && (
                                    <p className="text-red-500 text-sm">{errors[`option_${index}_name`]}</p>
                                )}
                                <button type="button" onClick={() => removeProduct(index)} className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">Remove</button>
                            </div>
                        ))}
                        <button type="button" onClick={addProduct} className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">Add Option</button>
                    </div>
                )
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
                <button
                    type="button"
                    onClick={() => handleStepChange(4)}
                    className={`px-4 py-2 rounded ${currentStep === 2 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}
                >
                    Options
                </button>
            </div>
            {renderStep()}
            {currentStep < 4 && (
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
            {currentStep === 4 && (
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
