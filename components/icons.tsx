import { 
  Braces, 
  Table, 
  Clock, 
  Percent, 
  Palette, 
  FileSpreadsheet, 
  Key, 
  Image as ImageIcon, 
  Lock, 
  FileCode, 
  CalendarClock, 
  Link2, 
  Fingerprint, 
  Code2,
  Sparkles
} from 'lucide-react';

export const getToolIcon = (slug: string) => {
  const props = { className: "w-5 h-5" };
  switch (slug) {
    case 'json-formatter': return <Braces {...props} className="w-5 h-5 text-blue-500" />;
    case 'csv-formatter': return <Table {...props} className="w-5 h-5 text-indigo-500" />;
    case 'cron-builder': return <Clock {...props} className="w-5 h-5 text-amber-500" />;
    case 'gst-calculator': return <Percent {...props} className="w-5 h-5 text-emerald-500" />;
    case 'color-palette': return <Palette {...props} className="w-5 h-5 text-pink-500" />;
    case 'invoice-maker': return <FileSpreadsheet {...props} className="w-5 h-5 text-teal-500" />;
    case 'password-generator': return <Key {...props} className="w-5 h-5 text-violet-500" />;
    case 'image-compressor': return <ImageIcon {...props} className="w-5 h-5 text-sky-500" />;
    case 'jwt-decoder': return <Lock {...props} className="w-5 h-5 text-rose-500" />;
    case 'base64': return <FileCode {...props} className="w-5 h-5 text-cyan-500" />;
    case 'unix-timestamp': return <CalendarClock {...props} className="w-5 h-5 text-orange-500" />;
    case 'url-encoder': return <Link2 {...props} className="w-5 h-5 text-blue-500" />;
    case 'uuid-generator': return <Fingerprint {...props} className="w-5 h-5 text-indigo-500" />;
    case 'html-encoder': return <Code2 {...props} className="w-5 h-5 text-teal-500" />;
    default: return <Sparkles {...props} className="w-5 h-5 text-blue-500" />;
  }
};
