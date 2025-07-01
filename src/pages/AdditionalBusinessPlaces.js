import React, { useState } from "react";

export default function BusinessForm() {
  const [formData, setFormData] = useState({
    applicantName: "",
    businessLocation: "within",
    stateAct: "",
    cstAct: "",
    branchType: "Warehouse",
    name: "",
    street: "",
    area: "",
    city: "",
    district: "West Tripura",
    state: "Tripura",
    pinCode: "",
    tel: "",
    fdrDate: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
  };

  return (
    <form onSubmit={handleSubmit} className=" mt-2 w-5/6 mx-auto p-4 shadow-lg bg-white space-y-4">
      <h2 className=" text-xl mt-0 font-bold">Additional Business Places</h2>
      <hr />




<div className=" f flex items-center space-x-4 px-4  px-4 pt-8">
   <label htmlFor="applicantName" className="  w-80 font-medium text-gray-700">
         Name of the Applicant
      </label>
      <input
        type="text"
        name="applicantName"
        placeholder=""
        value={formData.applicantName}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      </div>




      <div className="  flex items-center space-x-4 px-4  pt-4">
      <label htmlFor="businessPlace" className=" ml-200px w-80 font-medium text-gray-700">
        Location of Business Places 
      </label>

      <div className="space-x-4">
        <label>
          <input
            type="radio"
            name="businessLocation"
            value="within"
            checked={formData.businessLocation === "within"}
            onChange={handleChange}
          /> Within State
        </label>
       

        <label>
          <input
            type="radio"
            name="businessLocation"
            value="outside"
            checked={formData.businessLocation === "outside"}
            onChange={handleChange}
          /> Outside State
        </label>
      </div>
 </div>




 <div className="  flex items-center space-x-4 px-4  pt-0">
      <label htmlFor="businessPlace" className=" w-[17rem] font-medium text-gray-700">
        Registration Number of Branch
      </label>
      <div className="flex flex-col space-y-4 mt-2 p-4">
      <div className="flex items-center space-x-4">
        <label htmlFor="stateAct" className="w-48 font-medium text-gray-700">
          Under State Actn :
        </label>
         <input
        type="text"
        name="stateAct"
        placeholder=""
        value={formData.stateAct}
        onChange={handleChange}
        className="w-200 px p-2 border rounded"
      />
      </div>

      <div className="flex items-center space-x-4">
        <label htmlFor="cstAct" className="w-48 font-medium text-gray-700">
          Under CST Act,1956 :
        </label>
        <input
        type="text"
        name="cstAct"
        placeholder=""
        value={formData.cstAct}
        onChange={handleChange}
        className="w-200 px p-2 border rounded"
      />
      </div>
    </div>
</div>






<div className=" flex items-center space-x-4 px-4 pt-0">
      <label htmlFor="businessPlace" className=" ml-200px w-80 font-medium text-gray-700">
        Branch Type
      </label>
      <select
        name="branchType"
        value={formData.branchType}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      >
        <option value="Warehouse">Warehouse</option>
        <option value="Factory">Factory</option>
        <option value="Office">Office</option>
        <option value="Office">Other</option>
      </select>
</div>














<div className=" flex items-center space-x-4 px-4 pt-0">
      <label htmlFor="name" className=" ml-200px w-80 font-medium text-gray-700">
        Name<span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        name="name"
        placeholder="Name"
        required
        value={formData.name}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
</div>




<div className=" flex items-center space-x-4 px-4 pt-0">
      <label htmlFor="number&street" className=" ml-200px w-80 font-medium text-gray-700">
        Number & Street
      </label>
      <input
        type="text"
        name="street"
        value={formData.street}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      </div>



<div className=" flex items-center space-x-4 px-4 pt-0">
      <label htmlFor="area" className=" ml-200px w-80 font-medium text-gray-700">
        Area
      </label>
      <input
        type="text"
        name="area"
        placeholder="Jirania"
        value={formData.area}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
</div>





<div className=" flex items-center space-x-4 px-4 pt-0">
      <label htmlFor="City" className=" ml-200px w-80 font-medium text-gray-700">
        Village/Town/City
      </label>
      <input
        type="text"
        name="city" 
        placeholder="Agartala" 
        value={formData.city}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      </div>



<div className=" flex items-center space-x-4 px-0 pt-0">
<div className=" flex items-center space-x-4 px-4 pt-0">
      <label htmlFor="district" className=" w-[15.5rem] font-medium text-gray-700">
        District
      </label>
      <input
        type="text"
        name="district"
        value={formData.district}
        readOnly
        className="w-[22rem] p-2 border rounded bg-gray-100"
      />
      </div>







<div className=" flex items-center space-x-2 px-4 pt-0">
      <label htmlFor="pincode" className=" w-[8.2rem] wl-[19rem] w-80 font-medium text-gray-700">
        PIN Code<span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        name="pinCode"
        required
        value={formData.pinCode}
        onChange={handleChange}
        className="w-[22rem] p-2 border rounded"
      />
</div>
</div>








<div className=" flex items-center space-x-4 px-4 pt-0">
      <label htmlFor="state" className=" ml-200px w-80 font-medium text-gray-700">
        State
      </label>
      <input
        type="text"
        name="state"
        value={formData.state}
        readOnly
        className="w-full p-2 border rounded bg-gray-100"
      />
</div>









 <div className=" flex items-center space-x-4 px-0 pt-0">
<div className=" flex items-center space-x-4 px-4 pt-0">
      <label htmlFor="tel" className=" w-[15.4rem] font-medium text-gray-700">
        Telephone Number
      </label>
      <input
        type="text"
        name="tel"
        placeholder="XXXXXXXXXX"
        value={formData.tel}
        onChange={handleChange}
        className="w-[22rem] p-2 border rounded"
      />
      </div>

<div className=" flex items-center space-x-1 px-0 pt-0 ">
      <label htmlFor="erd" className=" mr-2 w-40 font-medium text-gray-700">
        ERD Date
      </label>
      <input
        type="date"
        name="fdrDate"
        value={formData.fdrDate}
        onChange={handleChange}
        className="w-[22rem] p-2 border rounded"
      />
</div>
</div>









      <div className="flex justify-between">
        <button type="button" className="px-4 mt-4 py-2 bg-gray-300 rounded">Prev</button>
        <button type="submit" className="px-4 mt-4 py-2 bg-blue-500 text-white rounded">Save & Continue</button>
      </div>
    </form>
  );
}
