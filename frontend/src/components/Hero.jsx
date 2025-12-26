import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import {
  Heart,
  Users,
  Clock,
  Calendar,
  Stethoscope,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Activity,
  Shield,
  Microscope,
  HeartPulse,
  Building2,
  CheckCircle2,
  Star,
  Award,
  Sparkles,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Hero({ setCurrentPage }) {
  const handleNavigation = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const labels = {
    doctors: "Doctors",
    patients: "Patients",
    years: "Years Experience",
    services: "Medical Services",
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* LEFT */}
          <div>
            <Badge className="mb-4 flex w-fit items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Trusted Healthcare
            </Badge>

            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Caring for Your <span className="text-blue-600">Health</span>
            </h1>

            <p className="text-gray-600 mb-8">
              Professional medical services with experienced doctors and modern
              facilities.
            </p>

            <div className="flex gap-4">
              <Button onClick={() => handleNavigation("appointment")}>
                Book Appointment
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <Button
                variant="outline"
                onClick={() => handleNavigation("contact")}
              >
                Contact Us
              </Button>
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative">
            <Card className="shadow-xl">
              <CardContent className="p-0">
                <ImageWithFallback
                  src="/doctor.png"
                  alt="Doctor"
                  className="rounded-lg"
                />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          {Object.entries(labels).map(([key, label]) => (
            <Card key={key}>
              <CardContent className="p-6 text-center">
                <h3 className="text-2xl font-bold text-blue-600">100+</h3>
                <p className="text-gray-600">{label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
