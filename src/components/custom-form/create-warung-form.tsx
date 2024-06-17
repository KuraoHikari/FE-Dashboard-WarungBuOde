import { cn } from "@/lib/utils";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import React from "react";
import {
  WarungResponseType,
  createMyWarungResponseType,
  createWarungSchema,
} from "@/schemas/warungSchema";
import { Icons } from "../icons";
import { useToast } from "../ui/use-toast";
import { LocateFixed } from "lucide-react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { isHTTPError } from "@/api/baseApi";
import { createMyWarung } from "@/services/warungServices";
import { useMutation } from "@tanstack/react-query";

interface CreateWarungFormProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  setopen: (open: boolean) => void;
  refetch: () => void; // Add this line
}
interface Position {
  lat: number;
  lng: number;
}

const CreateWarungForm = ({
  className,
  setopen,
  refetch,
  ...rest
}: CreateWarungFormProps) => {
  const { toast } = useToast();
  const [position, setPosition] = React.useState<Position | null>(null);

  const [isLoading, setIsLoading] = React.useState(false);
  const formSchema = createWarungSchema;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      location: "",
    },
  });

  const MapClickHandler = () => {
    useMapEvents({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      click(e: any) {
        const newPosition: Position = e.latlng;
        setPosition(newPosition);

        const googleMapsLink = `https://www.google.com/maps?q=${newPosition.lat},${newPosition.lng}`;

        form.setValue("location", googleMapsLink);
      },
    });
    return null;
  };

  const handleLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        const { latitude, longitude } = position.coords;
        const newPosition: Position = { lat: latitude, lng: longitude };
        setPosition(newPosition);
        const googleMapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
        form.setValue("location", googleMapsLink);
      }
    );
  };
  const createWarungMutation = useMutation({
    mutationFn: async (
      data: z.infer<typeof createWarungSchema>
    ): Promise<createMyWarungResponseType> => {
      return createMyWarung(data);
    },
    onError: async (error) => {
      console.log("🚀 ~ onError: ~ error:", error);
      if (isHTTPError(error)) {
        const errorJson = await error.response.json();

        toast({
          title: "Error",
          variant: "destructive",
          description: errorJson.message,
        });
      } else {
        toast({
          title: "Error",
          variant: "destructive",
          description: "Failed to Register",
        });
      }
    },
    onSuccess: () => {
      toast({
        title: "Create Warung Success",
        description: "You have successfully create your Warung",
      });
      form.reset();
      refetch();
      setopen(false);
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    createWarungMutation.mutate(values);

    setIsLoading(false);
  }

  return (
    <div className={cn("grid gap-6", className)} {...rest}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid gap-2">
            <div className="grid gap-1">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Warung Name</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="bu-ode" {...field} />
                    </FormControl>
                    <FormDescription>Your warung name</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <div className="flex gap-2 ">
                        <Input
                          type="text"
                          placeholder="https://www.google.com/maps?q"
                          {...field}
                        />
                        <Button
                          className="col-span-1"
                          variant="outline"
                          onClick={handleLocation}
                          type="button"
                        >
                          <LocateFixed className="h-4 w-4 me-2" />
                        </Button>
                      </div>
                    </FormControl>
                    <FormDescription>
                      {" "}
                      Your warung address. you can use your own google maps link
                    </FormDescription>

                    <FormMessage />
                    <MapContainer
                      //ignoring the error because the center is a required prop
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      center={[-8.56404685895292, 115.22582292341778]}
                      zoom={5}
                      scrollWheelZoom={true}
                      zoomControl={true}
                      zoomControlPosition="bottomright"
                      zoomControlScrollWheel={true}
                      zoomControlZoomInText="+"
                      style={{ height: "400px", width: "100%" }}
                    >
                      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                      <MapClickHandler />
                      {position && <Marker position={position} />}
                    </MapContainer>
                  </FormItem>
                )}
              />

              <Button className="mt-4" type="submit" disabled={isLoading}>
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Submit
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateWarungForm;
