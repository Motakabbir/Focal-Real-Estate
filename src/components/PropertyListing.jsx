import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Card from './Card';


const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
        slidesToSlide: 1 // optional, default to 1.
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
        slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        slidesToSlide: 1 // optional, default to 1.
    }
};

const FilterBox = ({ onClose, bedrooms, bathrooms, carports }) => {
    const [bedroomRange, setBedroomRange] = useState(0);
    const [bathroomRange, setBathroomRange] = useState(0);
    const [carportRange, setCarportRange] = useState(0);

    // Set initial state when component loads or props change
    useEffect(() => {
        if (bedrooms !== undefined) setBedroomRange(bedrooms);
        if (bathrooms !== undefined) setBathroomRange(bathrooms);
        if (carports !== undefined) setCarportRange(carports);
    }, [bedrooms, bathrooms, carports]);

    const handleApplyFilter = () => {
        onClose({
            bedrooms: bedroomRange,
            bathrooms: bathroomRange,
            carports: carportRange,
        });
    };

    const resetHandler = () => {
        setBedroomRange(0);
        setBathroomRange(0);
        setCarportRange(0);
    }

    return (
        <div className="mt-6 items-center justify-center w-1/2 p-4 mx-auto bg-white border border-gray-300 rounded-lg shadow-md max-sm:text-center max-sm:justify-center">
            <div className="flex flex-row w-full mx-auto">
                <div className="flex mx-auto max-sm:flex-col">

                    {/* Bedrooms */}
                    <div className="mb-6">
                        <label className="block mb-2">Bedrooms: </label>
                        <div className="p-2">
                            <input
                                type="range"
                                min="0"
                                max="25"
                                step="1"
                                value={bedroomRange}
                                onChange={(e) => setBedroomRange(Number(e.target.value))}
                            />
                            <div className="text-xs">
                                <span>0 - {bedroomRange}</span>
                            </div>
                        </div>
                    </div>

                    {/* Bathrooms */}
                    <div className="mb-6">
                        <label className="block mb-2">Bathrooms: </label>
                        <div className="p-2">
                            <input
                                type="range"
                                min="0"
                                max="25"
                                step="1"
                                value={bathroomRange}
                                onChange={(e) => setBathroomRange(Number(e.target.value))}
                            />
                            <div className="text-xs">
                                <span>0 - {bathroomRange}</span>
                            </div>
                        </div>
                    </div>

                    {/* Carports */}
                    <div className="mb-6">
                        <label className="block mb-2">Car Spaces: </label>
                        <div className="p-2">
                            <input
                                type="range"
                                min="0"
                                max="5"
                                step="1"
                                value={carportRange}
                                onChange={(e) => setCarportRange(Number(e.target.value))}
                            />
                            <div className="text-xs">
                                <span>0 - {carportRange}</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Apply Filter Button */}
            <div className="flex justify-center w-full mx-auto gap-2">
                <button
                    className="p-2 text-white rounded bg-focal-blue sm:w-auto max-sm:w-40"
                    onClick={handleApplyFilter}
                >
                    Apply Filter
                </button>
                <button
                    className="p-2 text-white rounded bg-red-600 sm:w-auto max-sm:w-40"
                    onClick={resetHandler}
                >
                    Rest
                </button>
            </div>
        </div>
    );
};


const PropertyListing = ({ pg, page, type, status, limit }) => {
    const slug = useLocation();
    const [propertyType, setPropertyType] = useState(type);
    const [listLimit, setListLimit] = useState(limit);
    const [itemStatus, setItemStatus] = useState(status);
    const [properties, setProperties] = useState([]);
    // const [price, setPrice] = useState(0);
    const [bathrooms, setBathrooms] = useState(0);
    const [bedrooms, setBedrooms] = useState(0);
    const [carports, setCarports] = useState(0);
    const [showFilterBox, setShowFilterBox] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, [propertyType, status, bathrooms, bedrooms, carports]);

    const fetchData = async () => {
        try {
            let apiUrl = 'https://focalrealestate.com.au/internal_api/framework/api/property-data-vaultre';
            // let apiUrl = 'https://focalrealestate.com.au/internal_api/framework/api/property-listing';
            // let apiUrl = 'https://focalrealestate.com.au/internal_api/properties.php';
            // let apiUrl = 'http://localhost/auclient/quarantine/internal_api/properties.php';
            let params = [];

            // console.log(apiUrl)
            if (propertyType) {
                if (propertyType == "residential") {
                    params.push(`type=residential`);
                } else if (propertyType == "rental") {
                    params.push(`type=residential`);
                } else {
                    params.push(`type=${propertyType}`);
                }
            }
            if (status) {
                // if(propertyType=="residential" && status != "settled")
                // {
                //   params.push(`status=buy`);
                // }else
                if (propertyType == "rental") {
                    params.push(`status=rental`);
                } else {
                    params.push(`status=${itemStatus}`);
                }
            }
            params.push(`page=${pg ? pg : "1"}`);
            params.push(`limit=${listLimit ? listLimit : "6"}`);


            //filter
            // if (price) {
            //   params.push(`price=${price}`);
            // }
            if (bathrooms) {
                params.push(`bathrooms=${bathrooms}`);
            }
            if (bedrooms) {
                params.push(`bedrooms=${bedrooms}`);
            }
            if (carports) {
                params.push(`carports=${carports}`);
            }
            // if (params.length > 0) {
            //     apiUrl += `?${params.join('&')}`;
            // }
            const response = await fetch(`${apiUrl}?${params.join('&')}`);
            // console.log(response);
            const result = await response.json();
            // if(propertyType == "rental")
            // {
            //   setProperties(result);
            // }else{
            setProperties(result?.items);
            // }
        } catch (error) {
            console.error('Error fetching data : ', error.message);
        }
        //   const response = await fetch(apiUrl);
        //   if (!response.ok) {
        //     throw new Error('Failed to fetch data');
        //   }
        //   const contentType = response.headers.get('content-type');
        //   if (contentType && contentType.indexOf('application/json') !== -1) {
        //     const result = await response.json();
        //     setProperties(result);
        //   } else {
        //     throw new Error('Invalid response format');
        //   }
        // } catch (error) {
        //   console.error('Error fetching data:', error.message);
        // }
    }

    const navigateToProperty = (property) => {
        const a = property?.heading?.trim().replace(/\s+/g, " ");
        const slug = a.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
        if (property) {
            navigate(`/property/${slug}?id=${property.id}?status=${property.status}`, { state: { property } });
            console.log('property 1', property)
            // navigate(`/property/${property.id}`, { state: { property } });
        }
    }

    const handleFilter = () => {
        if (!showFilterBox) setShowFilterBox(!showFilterBox);
    }

    const handleFilterValues = (filterValues) => {
        setBathrooms(filterValues.bathrooms);
        setBedrooms(filterValues.bedrooms);
        setCarports(filterValues.carports);
        // setPrice(filterValues.price);
        setShowFilterBox(false);
    }

    const handleTypeChange = (type) => {

        setPropertyType(type);
        if (type === "residential") {
            // console.log(type)
            setListLimit("12");
            setItemStatus("listing");
        }
        if (type === "rental") {
            setListLimit("6");
            setItemStatus(type);
        }

    }


    const extractFirstImage = (images) => {
        if (!images) return null;
        if (Array.isArray(images)) {
            return images[0];
        }
        if (typeof images === 'string') {
            const urls = images.split("https://").filter(Boolean).map(url => "https://" + url);
            return urls[0];
        }
        return null;
    };
    return (
        <div>
            {page === "home" ? (
                <div className="flex items-center justify-center mx-auto mb-6 animate-on-scroll">
                    <button type="button" onClick={() => handleTypeChange("residential")} className={`py-3 px-4 inline-flex items-center gap-x-2 -ms-px first:rounded-s-lg first:ms-0 last:rounded-e-lg text-lg ${propertyType === "residential" ? "text-focal-blue" : "text-gray-800"} font-medium focus:z-10 border border-gray-200 bg-white shadow-sm hover:bg-gray-50 disabled:opacity-50`} >
                        <img src="./icons/dollar.png" className="inline" />
                        Buy
                    </button>
                    <button type="button" onClick={() => handleTypeChange("rental")} className={`py-3 px-4 inline-flex items-center gap-x-2 -ms-px first:rounded-s-lg first:ms-0 last:rounded-e-lg text-lg ${propertyType === "rental" ? "text-focal-blue" : "text-gray-800"} font-medium focus:z-10 border border-gray-200 bg-white shadow-sm hover:bg-gray-50 disabled:opacity-50`}>
                        <img src="./icons/house.png" className="inline" />
                        Rent
                    </button>
                </div>)
                : (<div className="flex-row items-center justify-center mx-auto mb-8 text-center max-sm:flex-col">
                    <p className="inline mr-4 font-semibold text-md max-sm:mb-2">Filters: </p>
                    <button
                        type="button"
                        onClick={handleFilter}
                        className="inline-flex items-center px-4 py-3 text-sm font-medium bg-white border border-gray-200 shadow-sm btn-filter gap-x-2 -ms-px first:ms-0 focus:z-10 hover:bg-gray-50 disabled:opacity-50 max-sm:mb-2"
                    >
                        <img src="./icons/bed.png" className="inline" />
                        {bedrooms === 0 ? "" : bedrooms} Bedrooms
                    </button>
                    <button
                        type="button"
                        onClick={handleFilter}
                        className="inline-flex items-center px-4 py-3 text-sm font-medium bg-white border border-gray-200 shadow-sm btn-filter gap-x-2 -ms-px first:ms-0 focus:z-10 hover:bg-gray-50 disabled:opacity-50 max-sm:mb-2"
                    >
                        <img src="./icons/bath.png" className="inline" />
                        {bathrooms === 0 ? "" : bathrooms} Bathrooms
                    </button>
                    <button
                        type="button"
                        onClick={handleFilter}
                        className="inline-flex items-center px-4 py-3 text-sm font-medium bg-white border border-gray-200 shadow-sm btn-filter gap-x-2 -ms-px first:ms-0 focus:z-10 hover:bg-gray-50 disabled:opacity-50 max-sm:mb-2"
                    >
                        <img src="./icons/car.png" className="inline" />
                        {carports === 0 ? "" : carports} Car Spaces
                    </button>
                    {/* <button
            type="button"
            onClick={handleFilter}
            className="inline-flex items-center px-4 py-3 text-sm font-medium bg-white border border-gray-200 shadow-sm btn-filter gap-x-2 -ms-px first:ms-0 focus:z-10 hover:bg-gray-50 disabled:opacity-50 max-sm:mb-2"
          >
            <img src="./icons/dollar.png" className="inline" />
            {price === 0 ? "" : price} Price
          </button> */}

                    {showFilterBox && <FilterBox onClose={handleFilterValues} bedrooms={bedrooms} bathrooms={bathrooms} carports={carports} />}

                </div>
                )}
            {/* <div className="grid justify-center grid-cols-1 gap-4 mb-8 sm:grid-cols-2 md:grid-cols-3"> */}
            {page == "home" || page === "appraisal" ?




                <Carousel
                    arrows={false}
                    swipeable={false}
                    draggable={false}
                    showDots={true}
                    responsive={responsive}
                    ssr={true} // means to render carousel on server-side.
                    infinite={true}
                    // autoPlay={this.props.deviceType !== "mobile" ? true : false}
                    autoPlay={true}
                    autoPlaySpeed={2000}
                    keyBoardControl={true}
                    customTransition="transform 300ms ease-in-out"
                    transitionDuration={300}
                    containerClass="carousel-container"
                    removeArrowOnDeviceType={["tablet", "mobile"]}
                    // deviceType={this.props.deviceType}
                    dotListClass="custom-dot-list-style"
                    itemClass="carousel-item-padding-40-px py-6"
                >
                    {(Object.values(properties)?.map((property, index) => (
                        <div key={index} className="mx-2" >
                            <div className="flex flex-col bg-white border shadow-sm rounded-xl" onClick={() => navigateToProperty(property)}>
                                {property.photos === undefined || property.photos === null || property.photos === "" || !property.photos ? <img className="w-full rounded-t-xl h-[250px] object-cover" src="no-image.jpg" alt="" />
                                    : <img className="w-full rounded-t-xl h-[250px] object-cover" src={property?.photos[0]?.url} alt="" />}
                                <div className="p-4 md:p-5 h-44">
                                    <h3 className="text-lg font-bold text-gray-800">{property?.heading}</h3>
                                    {/* <p className="mt-1 text-sm text-gray-500">{property.streetNumber} {property.street} {property.address_state} {property.suburb}  {property.country} {property.postcode}</p> */}
                                    <p className="mt-1 text-sm text-gray-500">{property?.displayAddress}</p>
                                    {/* <p className="mt-3 text-gray-500">{property.description}</p> */}
                                    <button className="inline-flex items-center justify-center px-3 py-2 mt-3 text-sm text-white bg-blue-600 border border-transparent rounded-lg gap-x-2 font-regular">
                                        {/* {property.status} */}
                                        {slug.pathname === "/" && property?.status === "management" ? "Rental" : property?.status}
                                    </button>
                                </div>
                                <div className="inline px-4 py-3 bg-white border-t rounded-b-xl md:py-4 md:px-5">
                                    <img src="./icons/bed.png" className="inline mx-2" />
                                    <p className="inline mt-1 mr-2 text-sm text-gray-500"> {property.bedrooms} </p>
                                    <img src="./icons/bath.png" className="inline mx-2" />
                                    <p className="inline mt-1 mr-2 text-sm text-gray-500"> {property.bathrooms} </p>
                                    <img src="./icons/car.png" className="inline mx-2" />
                                    <p className="inline mt-1 mr-2 text-sm text-gray-500"> {property.carports} </p>
                                </div>
                            </div>
                        </div>
                    )))}
                </Carousel> :
                <div className="grid justify-center grid-cols-1 gap-4 mb-8 sm:grid-cols-2 md:grid-cols-3">{
                    (

                        properties ? Object.values(properties)?.map((property, index) => (

                            <div key={index} className="flex flex-col bg-white border shadow-sm rounded-xl" onClick={() => navigateToProperty(property)}>
                                {property?.photos === undefined || property?.photos === null || property?.photos === "" || !property?.photos[0] ? <img className="w-full rounded-t-xl h-[250px] object-cover" src="no-image.jpg" alt="" />
                                    : <img className="w-full rounded-t-xl h-[250px] object-cover" src={property?.photos[0]?.url} alt="" />}
                                <div className="p-4 md:p-5 h-44">
                                    <h3 className="text-lg font-bold text-gray-800">{property?.heading}</h3>
                                    <p className="mt-1 text-sm text-gray-500">{property?.displayAddress}</p>
                                    <button className="inline-flex items-center justify-center px-3 py-2 mt-3 text-sm text-white bg-blue-600 border border-transparent rounded-lg gap-x-2 font-regular">
                                        {slug.pathname === "/" && property?.status === "management" ? "Rental" : property?.status}
                                    </button>
                                </div>
                                <div className="inline px-4 py-3 bg-white border-t rounded-b-xl md:py-4 md:px-5">
                                    <img src="./icons/bed.png" className="inline" />
                                    <p className="inline mt-1 mr-2 text-sm text-gray-500"> {property?.bed} </p>
                                    <img src="./icons/bath.png" className="inline" />
                                    <p className="inline mt-1 mr-2 text-sm text-gray-500"> {property?.bath} </p>
                                    <img src="./icons/car.png" className="inline" />
                                    <p className="inline mt-1 mr-2 text-sm text-gray-500"> {property?.carports} </p>
                                </div>
                            </div>

                        )) : ""
                    )
                }
                </div>
            }
        </div>
        // </div>
    );
};

export default PropertyListing;
