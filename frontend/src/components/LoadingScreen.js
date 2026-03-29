import { Loader2 } from 'lucide-react';

const LOGO_URL = 'https://customer-assets.emergentagent.com/job_8b258d09-2813-4c39-875f-1044b1a2ed97/artifacts/bnfmcn2l_rqVRL__1_-removebg-preview.png';

export default function LoadingScreen({ message = 'Loading...' }) {
  return (
    <div className="fixed inset-0 bg-[#F0F4FA] z-50 flex flex-col items-center justify-center">
      {/* Animated Logo */}
      <div className="relative">
        <div className="w-20 h-20 bg-[#CC0000] rounded-2xl flex items-center justify-center shadow-lg shadow-[#CC0000]/30 animate-pulse">
          <img src={LOGO_URL} alt="Discuss" className="h-10 brightness-0 invert" />
        </div>
        {/* Spinning ring */}
        <div className="absolute -inset-2">
          <div className="w-24 h-24 border-4 border-transparent border-t-[#CC0000] rounded-full animate-spin" />
        </div>
      </div>
      
      {/* Brand name */}
      <h1 className="font-heading text-2xl font-bold text-[#0F172A] italic mt-6">discuss</h1>
      
      {/* Loading indicator */}
      <div className="flex items-center gap-2 mt-4 text-[#64748B]">
        <Loader2 className="w-4 h-4 animate-spin" />
        <span className="text-[13px]">{message}</span>
      </div>
      
      {/* Loading dots animation */}
      <div className="flex gap-1.5 mt-6">
        <div className="w-2 h-2 bg-[#CC0000] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
        <div className="w-2 h-2 bg-[#CC0000] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
        <div className="w-2 h-2 bg-[#CC0000] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
    </div>
  );
}
