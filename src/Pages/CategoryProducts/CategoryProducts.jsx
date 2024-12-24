import { useContext, useEffect } from "react"
import { categoryContext } from "../../Components/Context/Filteration.context"
import Loading from "../../Components/Loading/Loading"
import ProductCard from "../../Components/ProductCard/ProductCard"



export default function CategoryProducts() {
  
  const{categoryProducts,getCategories} = useContext(categoryContext)


  return (
      <>
     {categoryProducts===null?(<Loading/>): 
  (   <div className='grid grid-cols-12 gap-4'>
    {categoryProducts.length===0?(<div className="col-span-12 flex items-center flex-col justify-center h-[400px]">
      <i className="fa-solid fa-face-sad-tear text-primary text-9xl"></i>
      <h4 className="text-4xl pt-5 text-slate-600 font-bold">Sorry, no products found !</h4>
    </div>):(
    categoryProducts.map((product)=> (<ProductCard productInfo={product} key={product._id}/>)) 
    )}
      
     </div>)
     }
      </>
  )
}
