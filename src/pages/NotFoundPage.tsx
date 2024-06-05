import { NotFoundSVGComponent } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
 const navigate = useNavigate();

 return (
  <div className="h-screen w-screen flex items-center">
   <div className="container flex flex-col md:flex-row items-center justify-center px-5 text-gray-700">
    <div className="max-w-md">
     <div className="text-5xl font-dark font-bold">404</div>
     <p className="text-2xl md:text-3xl font-light leading-normal">Sorry we couldn't find this page. </p>
     <p className="mb-8">But dont worry, you can find plenty of other things on our homepage.</p>

     <Button
      variant="outline"
      className="text-white"
      onClick={() => {
       navigate("/warung");
      }}
     >
      Back to homepage
     </Button>
    </div>
    <div className="max-w-lg">
     <NotFoundSVGComponent />
    </div>
   </div>
  </div>
 );
};

export default NotFoundPage;
