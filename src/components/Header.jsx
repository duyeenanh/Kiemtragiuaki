export default function Header({ soLuong, hanhDong }) {
  const tenQuan = import.meta.env.VITE_TEN_QUAN || "Quán Huế Xưa";

  return (
    <header data-testid="header-component" style={{ borderBottom: '2px solid #ddd', paddingBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <h1>{tenQuan}</h1>
        {hanhDong}
      </div>
      <div data-testid="cart-badge" style={{ fontSize: '18px', fontWeight: 'bold', color: '#d9534f', background: '#fcf8e3', padding: '8px 15px', borderRadius: '5px' }}>
        Giỏ hàng: <span>{soLuong || 0}</span> phần
      </div>
    </header>
  );
}