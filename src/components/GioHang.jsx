import { useMemo } from 'react';

export default function GioHang({ gioHang, danhSachMon, onDatMon }) {
  const tongTien = useMemo(
    () => gioHang.reduce((tong, dong) => {
      const mon = danhSachMon.find((monAn) => monAn.id === dong.id);
      const thanhTien = mon ? mon.gia * dong.soLuong : 0;
      return tong + thanhTien;
    }, 0),
    [gioHang, danhSachMon],
  );

  return (
    <section aria-labelledby="gio-hang-title" style={{ marginTop: '28px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', textAlign: 'left' }}>
      <h2 id="gio-hang-title">Giỏ hàng</h2>
      {gioHang.length === 0 ? (
        <p>Giỏ hàng trống</p>
      ) : (
        <>
          <ul style={{ paddingLeft: '20px' }}>
            {gioHang.map((dong) => {
              const mon = danhSachMon.find((monAn) => monAn.id === dong.id);
              if (!mon) return null;

              const thanhTien = mon.gia * dong.soLuong;
              return (
                <li key={dong.id} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '6px 16px', marginBottom: '12px' }}>
                  <span>{mon.ten} x {dong.soLuong}</span>
                  <span>{mon.gia.toLocaleString()} đ/phần</span>
                  <strong>Thành tiền: {thanhTien.toLocaleString()} đ</strong>
                </li>
              );
            })}
          </ul>
          <p style={{ fontWeight: 'bold' }}>Tổng tiền: {tongTien.toLocaleString()} đ</p>
          <button type="button" onClick={onDatMon} style={{ marginTop: '12px', padding: '10px 16px', cursor: 'pointer' }}>
            Đặt món
          </button>
        </>
      )}
    </section>
  );
}