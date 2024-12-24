import React, { useContext } from 'react'
import { categoryContext } from '../Context/Filteration.context'

export default function SlideFilter() {

     const {changeFilter,getAllProducts,getShortProducts,filter,getAdidasProducts,getDefactoProducts,getSonyProducts,getWomensProducts,
      getMensProducts,getElecProducts,getCanonProducts,getShortSProducts} = useContext(categoryContext)
    

  return (
   <>
   <div className={` ${filter? "left-0":"left-[-300px]"} transition-all duration-300 w-[300px] z-50 rounded-3xl fixed h-full  top-0 bg-slate-100 shadow-2xl px-5 flex items-start justify-center flex-col`}>
   <div
   onClick={()=>{
    changeFilter(false)
   }}
   className='absolute right-10 top-12 text-4xl cursor-pointer hover:animate-wobble text-primary'><i className="fa-brands fa-expeditedssl"></i></div>
    <div>
        <h3 className='text-xl font-bold text-slate-700 underline uppercase pb-2'>Sort</h3>
        <span className='font-bold text-slate-700 pb-1'>Price:</span>
        <div className='flex flex-col gap-2 pt-2'>
            <div className='flex items-center justify-center cursor-pointer'>
            <label htmlFor="up" className='cursor-pointer'
            onClick={()=>{
              getShortSProducts()
            }}>Smaller to Bigger</label>
        <input type="radio" id='up' name="radio-5" className="radio radio-success ml-2 w-5 h-5" defaultChecked />    
            </div>
        <div className='flex items-center justify-center cursor-pointer'
        onClick={()=>
          getShortProducts()
        }>
         <label htmlFor="down" className='cursor-pointer'> Bigger to Smaller </label>
        <input type="radio" id='down' name="radio-5" className="radio radio-success ml-2 w-5 h-5" />     
        </div>
        </div>
    </div>
    <div className='mt-5'>
    <h3 className='text-xl font-bold text-slate-700 underline uppercase pb-2'>Filter</h3>
    <div>
        <span className='font-bold text-slate-700'>Categories:</span>
  <label className="cursor-pointer label justify-start" >
    <input type="checkbox"  className="checkbox checkbox-success mr-2 w-5 h-5"  name="check"
        onChange={(e) => {
          const checkboxes = document.querySelectorAll("input[type='checkbox'][name='check']");
          checkboxes.forEach((checkbox) => {
              if (checkbox !== e.target) {
                  checkbox.checked = false;
              }
          });
          if (e.target.checked) {
              getWomensProducts(); // Run the function only when checked
          }else{
            getAllProducts()
          }
      }}/>
    <span className="label-text">Women's Fashion</span>
  </label>
  <label className="cursor-pointer label justify-start" >
    <input type="checkbox"  className="checkbox checkbox-success mr-2 w-5 h-5"  name="check" 
        onChange={(e) => {
          const checkboxes = document.querySelectorAll("input[type='checkbox'][name='check']");
          checkboxes.forEach((checkbox) => {
              if (checkbox !== e.target) {
                  checkbox.checked = false;
              }
          });
          if (e.target.checked) {
              getMensProducts(); // Run the function only when checked
          }else{
            getAllProducts()
          }
      }}/>
    <span className="label-text">Men's Fashion</span>
  </label>
  <label className="cursor-pointer label justify-start" >
    <input type="checkbox"  className="checkbox checkbox-success mr-2 w-5 h-5 " name="check"
        onChange={(e) => {
          const checkboxes = document.querySelectorAll("input[type='checkbox'][name='check']");
          checkboxes.forEach((checkbox) => {
              if (checkbox !== e.target) {
                  checkbox.checked = false;
              }
          });
          if (e.target.checked) {
              getElecProducts(); // Run the function only when checked
          }else{
            getAllProducts()
          }
      }} />
    <span className="label-text ">Electronics</span>
  </label>
</div>
    <div>
        <span className='font-bold text-slate-700'>Brands:</span>
        <label className="cursor-pointer label justify-start" >
    <input type="checkbox"  className="checkbox checkbox-success mr-2 w-5 h-5"  name="check"
        onChange={(e) => {
          const checkboxes = document.querySelectorAll("input[type='checkbox'][name='check']");
          checkboxes.forEach((checkbox) => {
              if (checkbox !== e.target) {
                  checkbox.checked = false;
              }
          });
          if (e.target.checked) {
              getCanonProducts(); // Run the function only when checked
          }else{
            getAllProducts()
          }
      }}/>
    <span className="label-text">Canon</span>
  </label>
  <label className="cursor-pointer label justify-start">
    <input
        type="checkbox"
        className="checkbox checkbox-success mr-2 w-5 h-5"
        name="check"
        onChange={(e) => {
          const checkboxes = document.querySelectorAll("input[type='checkbox'][name='check']");
          checkboxes.forEach((checkbox) => {
              if (checkbox !== e.target) {
                  checkbox.checked = false;
              }
          });
            if (e.target.checked) {
                getSonyProducts(); // Run the function only when checked
            }else{
              getAllProducts()
            }
        }}
    />
    <span className="label-text">Sony</span>
</label>

  <label className="cursor-pointer label justify-start" >
    <input type="checkbox"  className="checkbox checkbox-success mr-2 w-5 h-5 " name="check"
        onChange={(e) => {
          const checkboxes = document.querySelectorAll("input[type='checkbox'][name='check']");
          checkboxes.forEach((checkbox) => {
              if (checkbox !== e.target) {
                  checkbox.checked = false;
              }
          });
          if (e.target.checked) {
              getDefactoProducts(); // Run the function only when checked
          }else{
            getAllProducts()
          }
      }} />
    <span className="label-text ">Defacto</span>
  </label>
  <label className="cursor-pointer label justify-start">
    <input type="checkbox"  className="checkbox checkbox-success mr-2 w-5 h-5 " name="check"
            onChange={(e) => {
              const checkboxes = document.querySelectorAll("input[type='checkbox'][name='check']");
              checkboxes.forEach((checkbox) => {
                  if (checkbox !== e.target) {
                      checkbox.checked = false;
                  }
              });
              if (e.target.checked) {
                getAdidasProducts(); // Run the function only when checked
              }else{
                getAllProducts()
              }
          }}  />
    <span className="label-text ">Adidas</span>
  </label>
    </div>
    </div>
   </div>
   </>
  )
}
