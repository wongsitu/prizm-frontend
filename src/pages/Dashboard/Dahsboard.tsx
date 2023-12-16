import { useState } from "react";
import { useFileContent, useFiles, useProcessFile } from "../../services/files/files";
import clsx from "clsx";

const Dashboard = () => {
  const { data } = useFiles();
  const [selectedFile, setSelectedFile] = useState<string>('');
  const [showPreview, setShowPreview] = useState<boolean>(false);

  const { data: fileContent } = useFileContent({ key: selectedFile, enabled: showPreview, isPreview: true })
  const { mutateAsync } = useProcessFile()

  const renderTable = () => {
    if (fileContent) {
      return (
        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
          <thead>
            <tr>
              <th className="border border-gray-300 p-3">StoreID</th>
              <th className="border border-gray-300 p-3">Customer_ID</th>
              <th className="border border-gray-300 p-3">Postal Code</th>
              <th className="border border-gray-300 p-3">Total_Visits</th>
              <th className="border border-gray-300 p-3">Dollars Spend</th>
            </tr>
          </thead>
          <tbody>
            {fileContent?.map((content)=> {
              return(
                <tr 
                  className={clsx("hover:bg-gray-100 focus-within:bg-gray-100 cursor-pointer")}
                  key={content.Customer_ID}
                >
                  <td className="border border-gray-300 p-3">{content.StoreID}</td>
                  <td className="border border-gray-300 p-3">{content.Customer_ID}</td>
                  <td className="border border-gray-300 p-3">{content['Postal Code']}</td>
                  <td className="border border-gray-300 p-3">{content.Total_Visits}</td>
                  <td className="border border-gray-300 p-3">{content['Dollars Spend']}</td>
                </tr>
              )}
            )}
          </tbody>
        </table>
      )
    }
    return (
      <table className="min-w-full bg-white border border-gray-300 rounded-lg">
        <thead>
          <tr>
            <th className="border border-gray-300 p-3">Key</th>
            <th className="border border-gray-300 p-3">ETag</th>
            <th className="border border-gray-300 p-3">LastModified</th>
            <th className="border border-gray-300 p-3">Owner</th>
            <th className="border border-gray-300 p-3">Size</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((file)=> {
            const isFile = !file.Key.endsWith('/');
            
            return(
              <tr 
                className={clsx("hover:bg-gray-100 focus-within:bg-gray-100 cursor-pointer", selectedFile === file.Key && "bg-blue-100 hover:bg-blue-100")}
                key={file.Key}
                onClick={()=>{
                  if (isFile) {
                    setSelectedFile(state => state === file.Key ? '' : file.Key);
                  }
                }}
              >
                <td className="border border-gray-300 p-3">{file.Key}</td>
                <td className="border border-gray-300 p-3">{file.ETag}</td>
                <td className="border border-gray-300 p-3">{file.LastModified}</td>
                <td className="border border-gray-300 p-3">{file.Owner.DisplayName}</td>
                <td className="border border-gray-300 p-3">{file.Size}</td>
              </tr>
            )}
          )}
        </tbody>
      </table>
    )
  }

  return (
      <div className="container mx-auto my-8 p-6 bg-gray-100 rounded-lg shadow-md">
      <div className="mb-4 flex items-center">
        <input
          type="text"
          placeholder="Search"
          className="p-2 border border-gray-300 rounded-l focus:outline-none"
        />
        <button 
          disabled={!selectedFile} 
          onClick={()=> setShowPreview(state => !state) } 
          className="bg-blue-500 text-white p-2 rounded-r hover:bg-blue-600 disabled:bg-gray-300"
        >
          Preview
        </button>
        <button 
          disabled={!selectedFile || !fileContent} 
          onClick={()=> { mutateAsync({ key: selectedFile }) }} 
          className="bg-green-500 text-white p-2 ml-2 rounded-r hover:bg-green-600 disabled:bg-gray-300"
        >
          Process
        </button>
      </div>
      <div className="overflow-x-auto">
        {renderTable()}
      </div>
    </div>
  );
};

export default Dashboard;
