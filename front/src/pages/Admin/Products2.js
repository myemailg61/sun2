import React, { useState } from 'react';
import axios from 'axios';

const Products2 = () => {
    const [faqs, setFaqs] = useState([{ question: '', answer: '' }]);

    // Function to handle changes in the input fields
    const handleInputChange = (index, event) => {
        const { name, value } = event.target;
        const newFaqs = [...faqs];
        newFaqs[index][name] = value;
        setFaqs(newFaqs);
    };

    // Function to add a new FAQ item
    const addFaq = () => {
        setFaqs([...faqs, { question: '', answer: '' }]);
    };

    // Function to remove a FAQ item
    const removeFaq = (index) => {
        const newFaqs = faqs.filter((_, i) => i !== index);
        setFaqs(newFaqs);
    };

    // Function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Create a FormData object
        const formData = new FormData();

        faqs.forEach((faq, index) => {
            formData.append(`faqs[${index}][question]`, faq.question);
            formData.append(`faqs[${index}][answer]`, faq.answer);
        });

        try {
            const response = await axios.post('http://localhost:8000/faqs', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data.message);
        } catch (error) {
            console.error('Error submitting FAQs:', error);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-4 mt-32">
            <form onSubmit={handleSubmit} className="space-y-4">
                {faqs.map((faq, index) => (
                    <div key={index} className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-4">
                        <input
                            type="text"
                            name="question"
                            placeholder="Question"
                            value={faq.question}
                            onChange={(event) => handleInputChange(index, event)}
                            className="flex-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <input
                            type="text"
                            name="answer"
                            placeholder="Answer"
                            value={faq.answer}
                            onChange={(event) => handleInputChange(index, event)}
                            className="flex-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        {faqs.length > 1 && (
                            <button
                                type="button"
                                onClick={() => removeFaq(index)}
                                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                            >
                                Remove
                            </button>
                        )}
                    </div>
                ))}
                <div className="flex space-x-4">
                    <button
                        type="button"
                        onClick={addFaq}
                        className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                        Add FAQ
                    </button>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Products2;
