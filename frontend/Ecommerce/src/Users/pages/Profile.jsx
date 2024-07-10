import React, { useEffect } from "react";
import { getUserData } from "../services/usersApiService";
import { useUser } from "../providers/UserProvider";

export default function Profile() {
  // const getUser = async () => {
  //   try {
  //     const userData = await getUserData();
  //     console.log(userData);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   getUser();
  // }, []);
  const { user } = useUser();

  return (
    <div class="container rounded bg-white mt-5 mb-5">
    <div class="row">
        <div class="col-md-3 border-right">
            <div class="d-flex flex-column align-items-center text-center p-3 py-5"><img class="rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"/><span class="font-weight-bold"><h5>{user.first}</h5></span><span class="text-black-50">{user.email}</span><span> </span></div>
        </div>
        <div class="col-md-5 border-right">
            <div class="p-3 py-5">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h4 class="text-right">Profile Info</h4>
                </div>
                <div class="row mt-2">
                     <div class="col-md-6"><label class="labels">Name</label><h5>{user.first}</h5></div> 
                    <div class="col-md-6"><label class="labels">Last Name</label><h5>{user.last}</h5></div>
                </div>
                <div class="row mt-3">
                    <div class="col-md-12"><label class="labels">Mobile Number</label><h5>{user.phone}</h5></div>
                    <div class="col-md-12"><label class="labels">City</label><h6>{user.city}</h6></div>
                    <div class="col-md-12"><label class="labels">Street</label>  {user.street}</div>
                    <div class="col-md-12"><label class="labels">Postcode</label> {user.zip}</div>
                    <div class="col-md-12"><label class="labels">HouseNumber</label> {user.housenumber}</div>
                </div>
                <div class="row mt-3">
                    <div class="col-md-6"><label class="labels">Country</label>  {user.country}</div>
                    <div class="col-md-6"><label class="labels">State/Region</label> {user.state}</div>
                </div>
            </div>
        </div>
        
    </div>
</div>

  
  )
  
}
