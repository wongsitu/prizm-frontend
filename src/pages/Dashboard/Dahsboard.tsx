import { useState } from "react";
import { useFileContent, useFiles } from "../../services/files/files";
import clsx from "clsx";

const Dashboard = () => {
  const { data } = useFiles();
  const [selectedFile, setSelectedFile] = useState<string>('');
  const [showPreview, setShowPreview] = useState<boolean>(false);

  const { data: fileContent } = useFileContent({ key: selectedFile, enabled: showPreview, isPreview: true })

  console.log(fileContent)

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
          className="bg-blue-500 text-white p-2 rounded-r hover:bg-blue-600 disabled:bg-gray-300 "
        >
          Preview
        </button>
        <button className="bg-green-500 text-white p-2 ml-2 rounded-r hover:bg-green-600">
          Process
        </button>
      </div>
      <div className="overflow-x-auto">
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
      </div>
    </div>
  );
};

export default Dashboard;
