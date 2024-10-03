import React from 'react'
import './About1.css'
import img1 from '../asset/about12.jpg'
import cardImg1 from '../asset/aboutCard1.jpg'
import cardImg2 from '../asset/aboutCard2.jpg'
import cardImg3 from '../asset/aboutCard3.jpg'

const About1 = () => {
    return (
        <div className='mt-16 '>
            <div className='abtContain h-[60vh] flex flex-col items-center justify-center'>
                <p className='text-center text-white font-font1'>About us</p>
                <p className='text-white font-font1 text-xl mt-2 font-semibold'>The first preference for latest in electrical equipments</p>
            </div>

            <div className='flex flex-row justify-center gap-4 mt-16 mx-8'>
                <div className='flex-1'>
                    <img src={img1}></img>
                </div>
                <div className='flex-1'>
                    <p className='font-font1 text-3xl font-semibold mb-4'>You buy, We deliver</p>
                    <p className='font-font1 text-gray-600 text-lg text-justify'>We have been asked how we’ve grown so quickly, the answer is simple. We have positioned the organization in providing the best and cheapest products and to provide the best customer service possible through technology. Internally, we call this our Supercalifragilisticexpialidocious philosophy.</p>

                    <div className='flex flex-row gap-8 mx-auto left-0 right-0 mt-8 w-11/12'>
                        <div className='flex-1 border border-solid border-gray-200 rounded py-2 px-2'>
                            <p className='font-font1 text-5xl font-semibold'>25+</p>
                            <p className='font-font1 text-xl'>Stores</p>
                            <p className='font-font1 text-base text-gray-600'>spectacular world of electronics</p>
                        </div>
                        <div className='flex-1  border border-solid border-gray-200 rounded py-2 px-2'>
                            <p className='font-font1 text-5xl font-semibold'>115+</p>
                            <p className='font-font1 text-xl'>Brands</p>
                            <p className='font-font1 text-base text-gray-600'>of good quality and repute</p>
                        </div>
                    </div>
                </div>
            </div>


            <div className='mt-16'>
                <p className='text-3xl text-center font-semibold font-font1'>What make us different</p>
                <p className='text-center font-font1 text-lg text-gray-600'>Distinctive Features That Set Us Apart from the Competition</p>

                <div className='flex flex-row mt-8 gap-4 mx-8 justify-center'>
                    <div className='flex-1 border border-solid border-gray-300 rounded-xl'>
                        <img src={cardImg1} className='w-full rounded-t-xl'></img>
                        <p className='text-center font-font1 text-2xl font-semibold mt-4 mb-4'>Customer Service</p>
                        <p className='text-gray-500 mx-4 mb-4 font-font1 text-justify'>At our company, exceptional customer service is at the heart of everything we do. We believe in building lasting relationships with our clients by providing personalized support and prompt solutions to their needs</p>
                    </div>
                    <div className='flex-1 border border-solid border-gray-300 rounded-xl'>
                        <img src={cardImg2} className='w-full rounded-t-xl'></img>
                        <p className='text-center font-font1 text-2xl font-semibold mt-4 mb-4'>Product Quality</p>
                        <p className='text-gray-500 mx-4 mb-4 font-font1 text-justify'>Product quality is the cornerstone of our brand, and we take immense pride in delivering only the best to our customers. Each item undergoes rigorous testing and quality assurance processes to ensure it meets our high standards.</p>
                    </div>
                    <div className='flex-1 border border-solid border-gray-300 rounded-xl'>
                        <img src={cardImg3} className='w-full rounded-t-xl'></img>
                        <p className='text-center font-font1 text-2xl font-semibold mt-4 mb-4'>Distribution Network</p>
                        <p className='text-gray-500 mx-4 mb-4 font-font1 text-justify'>Our distribution network is designed to ensure that our products reach you quickly and efficiently. We have established strong partnerships with trusted logistics providers and utilize advanced technology to optimize our supply chain.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About1;