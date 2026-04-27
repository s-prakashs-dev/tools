export default function AdSlot({ slot, className = "" }: { slot: string; className?: string }) {
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID;

  if (!adsenseId) {
    return (
      <div
        className={`w-full min-h-[50px] md:min-h-[90px] bg-gray-50 rounded-xl border border-dashed border-gray-200 ${className}`}
        aria-hidden="true"
      />
    );
  }

  return (
    <div className={`my-4 w-full min-h-[50px] md:min-h-[90px] rounded-xl ${className}`}>
      <ins
        className="adsbygoogle"
        style={{
          display: "block",
          minHeight: "90px",
        }}
        data-ad-client={adsenseId}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js" />
      <script>{`(adsbygoogle = window.adsbygoogle || []).push({});`}</script>
    </div>
  );
}
