import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Pagination from '../../../components/Pagination';

const FilterBox = ({ onClose }) => {
  // const [priceRange, setPriceRange] = useState([0, 1000]);
  const [bedroomRange, setBedroomRange] = useState([0, 25]);
  const [bathroomRange, setBathroomRange] = useState([0, 25]);
  const [carportRange, setCarportRange] = useState([0, 5]);

  const handleApplyFilter = () => {
    onClose({
      // price: priceRange[0],
      bedrooms: bedroomRange[0],
      bathrooms: bathroomRange[0],
      carports: carportRange[0],
    })
  }

  return (
    <div className="items-center justify-center w-1/2 p-4 mx-auto bg-white border border-gray-300 rounded-lg shadow-md max-sm:text-center max-sm:justify-center">
      <div className='flex flex-row w-full mx-auto'>
        <div className='flex mx-auto max-sm:flex-col'>
          <div className='mb-6'>
            <label className='block mb-2'>Bedrooms: </label>
            <div className='p-2'>
              <input type="range" min="0" max="25" step="1" value={bedroomRange[0]} onChange={(e) => setBedroomRange(e.target.value.split(',').map(Number))} />
              <div className='text-xs'>
                <span>0 - {bedroomRange[0]}</span>
              </div>
            </div>
          </div>
          <div className='mb-6'>
            <label className='block mb-2'>Bathrooms: </label>
            <div className='p-2'>
              <input type="range" min="0" max="25" step="1" value={bathroomRange[0]} onChange={(e) => setBathroomRange(e.target.value.split(',').map(Number))} />
              <div className='text-xs'>
                <span>0 - {bathroomRange[0]}</span>
              </div>
            </div>
          </div>
          <div className='mb-6'>
            <label className='block mb-2'>Car Spaces: </label>
            <div className='p-2'>
              <input type="range" min="0" max="5" step="1" value={carportRange[0]} onChange={(e) => setCarportRange(e.target.value.split(',').map(Number))} />
              <div className='text-xs'>
                <span>0 - {carportRange[0]}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='w-full mx-auto'>
        <button className='p-2 text-white rounded bg-focal-blue sm:w-auto max-sm:w-40' onClick={handleApplyFilter}>Apply Filter</button>
      </div>
    </div>
  )
}


const LeasedListing = () => {

  const [properties, setProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 50; 
  const navigate = useNavigate();
  const [showFilterBox, setShowFilterBox] = useState(false);
  // const [price, setPrice] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);
  const [bedrooms, setBedrooms] = useState(0);
  const [carports, setCarports] = useState(0);



 


  useEffect(() => {
    fetchProperties();
  }, [currentPage,bathrooms, bedrooms, carports]); 

  const fetchProperties = async () => {
    try {
      let apiUrl = 'https://focalrealestate.com.au/internal_api/framework/api/property-data-vaultre';
      // let apiUrl = 'https://focalrealestate.com.au/internal_api/framework/api/property-listing';
      // let apiUrl = 'https://focalrealestate.com.au/internal_api/properties.php';
      // let apiUrl = 'http://localhost/auclient/quarantine/internal_api/properties.php';
      let params = [];
      // console.log(apiUrl)
      
      params.push(`type=residential`);
      params.push(`status=management`);
      params.push(`page=${currentPage}`);
      params.push(`limit=${itemsPerPage}`);
      if (bathrooms) {
        params.push(`bathrooms=${bathrooms}`);
      }
      if (bedrooms) {
        params.push(`bedrooms=${bedrooms}`);
      }
      if (carports) {
        params.push(`carports=${carports}`);
      }
      if (params.length > 0) {
        apiUrl += `?${params.join('&')}`;
      }

      const response = await fetch(`${apiUrl}?${params.join('&')}`); 
      if (!response.ok) {
        throw new Error('Failed to fetch properties');
      }
      const data = await response.json();
      console.log(data)
      setProperties(data?.items);
      setTotalItems(data?.totalItems); 
      // console.log('Properties after update:', properties);
      // console.log('Total Items after update:', totalItems);
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  };
  
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  
  const handleFilter = () => {
    setShowFilterBox(!showFilterBox);
  }

  const handleFilterValues = (filterValues) => {
    setBathrooms(filterValues.bathrooms);
    setBedrooms(filterValues.bedrooms);
    setCarports(filterValues.carports);
    // setPrice(filterValues.price);
    setShowFilterBox(false);
  }


  const navigateToProperty = (property) => {
    const a = property?.heading?.trim().replace(/\s+/g, " ");
    const slug = a.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    if (property) {
      navigate(`/property/${slug}?id=${property.id}&status=${property.status}`, { state: { property } });
      console.log('property 1',property)
      // navigate(`/property/${property.id}`, { state: { property } });
    }
  }
  return (
    <div className="py-24 bg-slate-100 sm:py-32">
      <div className="items-center px-6 mx-auto max-w-7xl lg:px-8">
        <div className="max-w-3xl mx-auto mb-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900">Browse through our recently leased properties</h2>
        </div>
        <div className="flex-row items-center justify-center mx-auto mb-8 text-center max-sm:flex-col">
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

          {showFilterBox && <FilterBox onClose={handleFilterValues} />}

        </div>

        {/* <PropertyListing page="leased" type="" status="management" pg={1} limit={21} /> */}
        <div className="grid justify-center grid-cols-1 gap-4 mb-8 sm:grid-cols-2 md:grid-cols-3">
            {(properties?.map((property, index) => (
          <div key={index} className="mx-2">
            <div className="flex flex-col bg-white border shadow-sm rounded-xl" onClick={() => navigateToProperty(property)}>
              {property?.photos === undefined || property?.photos === null || property?.photos === "" || !property?.photos[0] ? <img className="w-full rounded-t-xl h-[250px] object-cover" src="no-image.jpg" alt="" />
              :<img className="w-full rounded-t-xl h-[250px] object-cover" src={property?.photos[0]?.url} alt="" />}
              <div className="p-4 md:p-5 h-44">
                <h3 className="text-lg font-bold text-gray-800">{property?.heading}</h3>
                {/* <p className="mt-1 text-sm text-gray-500">{property.streetNumber} {property.street} {property.address_state} {property.suburb}  {property.country} {property.postcode}</p> */}
                <p className="mt-1 text-sm text-gray-500">{property?.displayAddress}</p>
                {/* <p className="mt-3 text-gray-500">{property.description}</p> */}
                <button className="inline-flex items-center justify-center px-3 py-2 mt-3 text-sm text-white bg-blue-600 border border-transparent rounded-lg gap-x-2 font-regular">
                  {property.status}
                </button>
              </div>
              <div className="inline px-4 py-3 bg-white border-t rounded-b-xl md:py-4 md:px-5">
                <img src="./icons/bed.png" className="inline mx-2" />
                <p className="inline mt-1 mr-2 text-sm text-gray-500"> {property?.bed} </p>
                <img src="./icons/bath.png" className="inline mx-2" />
                <p className="inline mt-1 mr-2 text-sm text-gray-500"> {property?.bath} </p>
                <img src="./icons/car.png" className="inline mx-2" />
                <p className="inline mt-1 mr-2 text-sm text-gray-500"> {property?.carports} </p>
              </div>
            </div>
          </div>
        )))}
    </div>
    <Pagination currentPage={currentPage} totalItems={totalItems} itemsPerPage={itemsPerPage} onPageChange={handlePageChange} />
          {/* <div className="flex justify-center mt-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 mr-2 text-gray-700 bg-gray-300 rounded-md focus:outline-none"
            >
              Previous
            </button>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage * itemsPerPage >= totalItems}
              className="px-4 py-2 ml-2 text-gray-700 bg-gray-300 rounded-md focus:outline-none"
            >
              Next
            </button>
          </div> */}
    </div>
    </div>
  );
};

export default LeasedListing;
