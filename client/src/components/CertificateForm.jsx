import React, { useState } from 'react';
import axios from 'axios';

function CertificateForm() {
  const [formData, setFormData] = useState({
    studentName: '',
    courseName: '',
    completionDate: '',
    authorities: [{ name: '', designation: '', signature: null }]
  });

  const handleInputChange = (e, index) => {
    const { name, value, files } = e.target;
    const updatedAuthorities = [...formData.authorities];
    
    if (name === 'signature' && files.length > 0) {
      updatedAuthorities[index].signature = files[0];
    } else {
      updatedAuthorities[index][name] = value;
    }
    
    setFormData({ ...formData, authorities: updatedAuthorities });
  };

  const addAuthority = () => {
    setFormData({
      ...formData,
      authorities: [...formData.authorities, { name: '', designation: '', signature: null }]
    });
  };

  const removeAuthority = (index) => {
    const updatedAuthorities = [...formData.authorities];
    updatedAuthorities.splice(index, 1);
    setFormData({ ...formData, authorities: updatedAuthorities });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSubmit = new FormData();
      formDataToSubmit.append('studentName', formData.studentName);
      formDataToSubmit.append('courseName', formData.courseName);
      formDataToSubmit.append('completionDate', formData.completionDate);

      formData.authorities.forEach((authority, index) => {
        formDataToSubmit.append(`authorities[${index}][name]`, authority.name);
        formDataToSubmit.append(`authorities[${index}][designation]`, authority.designation);
        formDataToSubmit.append(`authorities[${index}][signature]`, authority.signature);
      });

      const response = await axios.post('http://localhost:8000/certificates/generate', formDataToSubmit);
      console.log('Certificate saved:', response.data);

      // Reset form after successful submission
      setFormData({
        studentName: '',
        courseName: '',
        completionDate: '',
        authorities: [{ name: '', designation: '', signature: null }]
      });
    } catch (error) {
      console.error('Error saving certificate:', error);
    }
  };

  return (
    <div className="container mx-auto mt-8 p-8 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Generate Certificate</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Student Name</label>
          <input
            type="text"
            name="studentName"
            value={formData.studentName}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Course Name</label>
          <input
            type="text"
            name="courseName"
            value={formData.courseName}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Completion Date</label>
          <input
            type="date"
            name="completionDate"
            value={formData.completionDate}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Authorities Section */}
        {formData.authorities.map((authority, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center space-x-4">
              <input
                type="text"
                name="name"
                value={authority.name}
                onChange={(e) => handleInputChange(e, index)}
                placeholder="Authority Name"
                className="p-2 border border-gray-300 rounded-md w-1/2"
                required
              />
              <input
                type="text"
                name="designation"
                value={authority.designation}
                onChange={(e) => handleInputChange(e, index)}
                placeholder="Designation"
                className="p-2 border border-gray-300 rounded-md w-1/2"
                required
              />
              <input
                type="file"
                name="signature"
                onChange={(e) => handleInputChange(e, index)}
                accept="image/*"
                className="p-2 border border-gray-300 rounded-md w-1/2"
                required
              />
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeAuthority(index)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={addAuthority}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Add Authority
        </button>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Generate Certificate
        </button>
      </form>
    </div>
  );
}

export default CertificateForm;
