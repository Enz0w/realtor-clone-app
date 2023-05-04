import { getAuth, updateProfile } from "firebase/auth"
import { doc, updateDoc } from "firebase/firestore"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { db } from "../firebase"
import { FcHome } from "react-icons/fc"

export default function Profile() {
  const auth = getAuth()
  const navigate = useNavigate()
  const [changeDetail, setChangeDetail] = useState(false)
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  })

  const {name, email} = formData

  function onLogout() {
    auth.signOut()
    navigate("/")
  }
  function onChange(e){
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }
  async function onSubmit() {
    try {
      if(auth.currentUser.displayName !== name){
        await updateProfile(auth.currentUser, {
          displayName: name,
        })
        const docRef = doc(db, "users", auth.currentUser.uid)
        await updateDoc(docRef, {
          name,
        })
      }
      toast.success("Profile details updated!")
    } catch (error) {
      toast.error("Could not update the profile details.")
    }
  }
  
  return (
    <>
      <section className="max-w-6xl mx-auto flex justify-center items-center flex-col">
        <h1 className="text-3xl text-center mt-6 font-bold">My Profile</h1>
        <div className="w-full md:w-[50%] mt-6 px-3">
          <form >
            <input 
              type="text" 
              id="name" 
              value={name} 
              disabled={!changeDetail} 
              onChange={onChange}
              className={`mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out ${
                changeDetail && "bg-red-200 focus:bg-red-200"
              }`}
            />

            <input 
              type="email" 
              id="email" 
              value={email} 
              disabled 
              className=" mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out"
            /> 

            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg">
              <p className="flex items-center mb-6">Do you want to change your name? 
                <span 
                  onClick={() => {
                    changeDetail && onSubmit()
                    setChangeDetail((prevState) => !prevState)
                  }} 
                  className="cursor-pointer text-red-600 hover:text-red-700 transition ease-in-out duration-200 ml-1"
                >
                    {changeDetail ? "Apply change" : "Edit"}
                </span>
              </p>            
              <p onClick={onLogout} className="cursor-pointer text-blue-600 hover:text-blue-800 transition ease-in-out duration-200">Sign out</p>
            </div>     
          </form>
          <button className="w-full bg-blue-600 text-white uppercase px-7 py-3 text-sm font-medium rounded shadow-md hover:bg-blue-700 transition ease-in-out duration-150 hover:shadow-lg active:bg-blue-800" type="submit">
            <Link className="flex justify-center items-center" to="/create-listing">
              <FcHome className="mr-2 text-3xl bg-red-200 rounded-full p-1 border-2"/>
              Sell or rent your home
            </Link>
          </button>
        </div>
      </section>
    </>
  )
}
