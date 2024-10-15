import { useEffect, useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";

function App() {
  const [user, setUser] = useState({});
  const fetchRandomUser = async () => {
    console.log('Fetching new user');
    try {
          const res = await fetch('https://api.freeapi.app/api/v1/public/randomusers/user/random');
          const data = await res.json();
          setUser(data.data);
        } catch {
          console.log(e);
        }
  }

  return (
    <>
      <div className="m-10 flex flex-col">
        <h1 className="text-3xl font-bold py-6">Find your partner</h1>
        <button 
          className="btn bg-blue-700 text-white p-2 text-xl"
          onClick={fetchRandomUser}
        >
          Generate
        </button>
        {user && (
          <div className=" flex flex-col mt-4 border-gray-300 border-2 p-2 rounded-xl w-[300px] gap-1">
            <img className="pb-5 rounded-md" src={user.picture?.large} alt={`${user.name?.first}'s portrait`} />
            <p className="text-2xl"> {user.name?.title} {user.name?.first} {user.name?.last} ({user.gender}/{user.dob?.age})</p>
            <p className="text-gray-500"> {user.email}</p>  
            {/* <p> {new Date(user.dob?.date).toLocaleDateString()}</p> */}
            <p>{user.location?.city}, {user.location?.state}, {user.location?.country}</p>
            <p> {user.phone}</p>

          </div>
        )}
        
      </div>
    </>
  );
}

export default App;
