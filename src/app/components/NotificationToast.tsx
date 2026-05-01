interface NotificationToastProps {
  message: string;
}

export function NotificationToast({ message }: NotificationToastProps) {
  return (
    <div className="absolute top-20 left-1/2 -translate-x-1/2 z-[110] animate-slide-down">
      <div className="bg-black/90 backdrop-blur-md text-white px-6 py-3 rounded-full shadow-lg">
        <p className="text-[13px] font-medium">{message}</p>
      </div>
    </div>
  );
}
