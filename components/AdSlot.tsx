export default function AdSlot({ slot, className = "" }: { slot: string; className?: string }) {
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID;

  if (!adsenseId) {
    return (
      <div className={`rounded-lg border border-gray-200 bg-gray-50 p-2 text-center ${className}`}>
        <p className="text-xs text-gray-400">Ad slot placeholder</p>
      </div>
    );
  }

  return (
    <div className={`my-4 rounded-lg border border-gray-200 bg-gray-50 p-2 text-center ${className}`}>
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
