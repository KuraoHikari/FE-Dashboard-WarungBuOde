import {
 Card,
 CardContent,
 CardDescription,
 CardFooter,
 CardHeader,
 CardTitle,
} from "@/components/ui/card";

import { LocateFixed, MoreHorizontal, Plus } from "lucide-react";

import {
 Dialog,
 DialogContent,
 DialogDescription,
 DialogFooter,
 DialogHeader,
 DialogTitle,
 DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Button } from "@/components/ui/button";

import {
 DropdownMenu,
 DropdownMenuContent,
 DropdownMenuItem,
 DropdownMenuLabel,
 DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
 Table,
 TableBody,
 TableCell,
 TableHead,
 TableHeader,
 TableRow,
} from "@/components/ui/table";

import { Tabs, TabsContent } from "@/components/ui/tabs";

import { useGetAllUserWarung } from "@/hooks/useGetWarungs";
import { useState } from "react";

import {
 MapContainer,
 TileLayer,
 Marker,
 useMapEvents,
 useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface Position {
 lat: number;
 lng: number;
}

const WarungPage = () => {
 const [position, setPosition] = useState<Position | null>(null);
 const [locationLink, setLocationLink] = useState<string>("");
 const { data, isLoading, error } = useGetAllUserWarung({
  page: 1,
  limit: 10,
  search: "",
 });

 if (isLoading) return "Loading...";
 if (error) return "An error has occurred: " + error.message;

 const MapClickHandler = () => {
  useMapEvents({
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   click(e: any) {
    const newPosition: Position = e.latlng;
    setPosition(newPosition);

    const googleMapsLink = `https://www.google.com/maps?q=${newPosition.lat},${newPosition.lng}`;

    setLocationLink(googleMapsLink);
   },
  });
  return null;
 };

 const handleLocation = () => {
  navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
   const { latitude, longitude } = position.coords;
   const newPosition: Position = { lat: latitude, lng: longitude };
   setPosition(newPosition);

   const googleMapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
   setLocationLink(googleMapsLink);
  });
 };

 return (
  <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
   <Tabs defaultValue="all">
    <TabsContent value="all">
     <Card x-chunk="dashboard-06-chunk-0">
      <CardHeader className="">
       <Dialog>
        <div className="flex items-center gap-2 justify-between">
         <div>
          <CardTitle>Warung</CardTitle>
          <CardDescription className="mt-2">
           Manage your warung and view their performance.
          </CardDescription>
         </div>
         <DialogTrigger asChild>
          <Button variant="outline" onSelect={(e) => e.preventDefault()}>
           <Plus className="h-4 w-4 me-2" />
           Add Warung
          </Button>
         </DialogTrigger>
        </div>

        <DialogContent className="sm:max-w-[825px]">
         <DialogHeader>
          <DialogTitle>Add Warung</DialogTitle>
          <DialogDescription>Add new warung to your list.</DialogDescription>
         </DialogHeader>
         <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
           <Label htmlFor="name" className="text-right">
            Name
           </Label>
           <Input
            id="name"
            defaultValue="Pedro Duarte"
            className="col-span-3"
           />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
           <Label htmlFor="location" className="text-right">
            Location
           </Label>
           <Input
            id="location"
            value={locationLink}
            readOnly
            className="col-span-2"
           />
           <Button
            className="col-span-1"
            variant="outline"
            onClick={handleLocation}
           >
            <LocateFixed className="h-4 w-4 me-2" />
           </Button>

           <div className="col-span-4">
            <MapContainer
             center={[-8.56404685895292, 115.22582292341778]}
             zoom={13}
             style={{ height: "400px", width: "100%" }}
            >
             <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

             <MapClickHandler />
             {position && <Marker position={position} />}
            </MapContainer>
           </div>
          </div>
         </div>
         <DialogFooter>
          <Button type="submit">Save changes</Button>
         </DialogFooter>
        </DialogContent>
       </Dialog>
      </CardHeader>
      <CardContent>
       <Table>
        <TableHeader>
         <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Location</TableHead>

          <TableHead>
           <span className="sr-only">Actions</span>
          </TableHead>
         </TableRow>
        </TableHeader>
        <TableBody>
         {data?.data?.map((warung) => (
          <TableRow key={warung.id}>
           <TableCell className="font-medium">{warung.name}</TableCell>
           <TableCell className="font-medium">{warung.location}</TableCell>
           <TableCell>
            <DropdownMenu>
             <DropdownMenuTrigger asChild>
              <Button aria-haspopup="true" size="icon" variant="ghost">
               <MoreHorizontal className="h-4 w-4" />
               <span className="sr-only">Toggle menu</span>
              </Button>
             </DropdownMenuTrigger>
             <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <Dialog>
               <DialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                 Edit
                </DropdownMenuItem>
               </DialogTrigger>
               <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                 <DialogTitle>Edit profile</DialogTitle>
                 <DialogDescription>
                  Make changes to your profile here. Click save when you're
                  done.
                 </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                 <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                   Name
                  </Label>
                  <Input
                   id="name"
                   defaultValue="Pedro Duarte"
                   className="col-span-3"
                  />
                 </div>
                 <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                   Username
                  </Label>
                  <Input
                   id="username"
                   defaultValue="@peduarte"
                   className="col-span-3"
                  />
                 </div>
                </div>
                <DialogFooter>
                 <Button type="submit">Save changes</Button>
                </DialogFooter>
               </DialogContent>
              </Dialog>
             </DropdownMenuContent>
            </DropdownMenu>
           </TableCell>
          </TableRow>
         ))}
        </TableBody>
       </Table>
      </CardContent>
      <CardFooter>
       <div className="text-xs text-muted-foreground">
        Showing{" "}
        {data?.data?.length !== 0 ? (
         <strong>1-{data?.data?.length}</strong>
        ) : (
         "0"
        )}{" "}
        of <strong>{data?.total}</strong> warung
       </div>
      </CardFooter>
     </Card>
    </TabsContent>
   </Tabs>
  </main>
 );
};

export default WarungPage;
