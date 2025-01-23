import { CheckCircle } from "lucide-react";
import { useState } from "react";

type DismissibleBannerProps = {
  message: string;
  type: "info" | "success" |"warning" |"danger";
};

const DismissibleBanner: React.FC<DismissibleBannerProps> = ({ message, type }) => {
  const [isVisible, setIsVisible] = useState(true);

  // Determine the styles based on the message type
  const bannerStyles = {
    info: "bg-gray-100 text-gray-800 border border-gray-300 ",
    success: "bg-green-100 text-green-700 border border-green-200",
    warning: "bg-orange-100 text-orange-800 border border-orange-200",
    danger: "bg-red-100 text-red-800 border border-red-200",
  };

  const handleDismiss = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className={`flex items-center justify-between p-4 rounded-md shadow-md ${bannerStyles[type]}`}>
      <CheckCircle className="h-5 w-5 flex-shrink-0"/>
      <span>{message}</span>
      <button
        onClick={handleDismiss}
        className="ml-4 text-xl font-semibold text-opacity-50 hover:text-opacity-100"
      >
        ×
      </button>
    </div>
  );
};

export default DismissibleBanner;
