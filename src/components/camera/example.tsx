import React, { useEffect, useRef, useState } from "react";
import { Camera, CameraType } from "react-camera-pro";
import {
 Dialog,
 DialogContent,
 DialogDescription,
 DialogHeader,
 DialogTitle,
 DialogTrigger,
} from "@/components/ui/dialog";

interface CameraExampleProps {
 image: string | null;
 setImage: React.Dispatch<React.SetStateAction<string | null>>;
}

const CameraExample: React.FC<CameraExampleProps> = ({ image, setImage }) => {
 const [numberOfCameras, setNumberOfCameras] = useState(0);

 const [showImage, setShowImage] = useState<boolean>(false);
 const camera = useRef<CameraType>(null);

 const [torchToggled, setTorchToggled] = useState<boolean>(false);

 return (
  <div className="fixed inset-0 z-10">
   <Dialog open={showImage} onOpenChange={setShowImage}>
    <DialogContent>
     <DialogHeader>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
      <DialogDescription>
       <div
        className="h-96 w-full bg-center bg-cover bg-no-repeat cursor-pointer"
        style={{ backgroundImage: `url(${image})` }}
        onClick={() => setShowImage(!showImage)}
       />
      </DialogDescription>
     </DialogHeader>
    </DialogContent>
    <Camera
     ref={camera}
     aspectRatio="cover"
     facingMode="environment"
     numberOfCamerasCallback={(i) => setNumberOfCameras(i)}
     errorMessages={{
      noCameraAccessible:
       "No camera device accessible. Please connect your camera or try a different browser.",
      permissionDenied:
       "Permission denied. Please refresh and give camera permission.",
      switchCamera:
       "It is not possible to switch camera to different one because there is only one video device accessible.",
      canvas: "Canvas is not supported.",
     }}
     videoReadyCallback={() => console.log("Video feed ready.")}
    />

    <div className="fixed flex right-0  min-w-[130px] min-h-[130px]  bg-black/80 z-10  items-center justify-between p-12 box-border flex-row bottom-0 w-full h-1/5 sm:p-2.5">
     {/* <div
     className="w-30 h-30 bg-black bg-contain bg-no-repeat bg-center cursor-pointer"
     style={{ backgroundImage: image ? `url(${image})` : "" }}
    /> */}

     <DialogTrigger>
      <img
       src={image ? image : ""}
       alt="Descriptive text"
       className="w-20 h-20"
       onClick={() => {
        setShowImage(!showImage);
       }}
      />
     </DialogTrigger>

     <button
      className="w-20 h-20 bg-center bg-[url('https://img.icons8.com/ios/50/000000/compact-camera.png')] bg-no-repeat border-4 border-black rounded-full cursor-pointer filter invert hover:bg-black/30"
      onClick={() => {
       if (camera.current) {
        const photo = camera.current.takePhoto();
        console.log(photo);
        setImage(photo as string);
       }
      }}
     />
     {camera.current?.torchSupported && (
      <button
       className={`w-20 h-20 bg-center bg-[url('https://img.icons8.com/ios/50/000000/light.png')] bg-no-repeat border-4 border-black rounded-full cursor-pointer filter invert ${
        torchToggled ? "bg-black/30" : ""
       }`}
       onClick={() => {
        if (camera.current) {
         setTorchToggled(camera.current.toggleTorch());
        }
       }}
      />
     )}
     <button
      className="w-10 h-10 bg-center bg-[url('https://img.icons8.com/ios/50/000000/switch-camera.png')] bg-no-repeat cursor-pointer filter invert hover:bg-black/30 disabled:opacity-0 disabled:cursor-default disabled:py-15 md:disabled:py-12"
      disabled={numberOfCameras <= 1}
      onClick={() => {
       if (camera.current) {
        const result = camera.current.switchCamera();
        console.log(result);
       }
      }}
     />
    </div>
   </Dialog>
  </div>
 );
};

export default CameraExample;
