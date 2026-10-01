import { useEffect, useRef, useState } from 'react';

const duLieuBanDau = { hoTen: '', soDienThoai: '', ghiChu: '' };

export default function FormDatMon({ choPhepGui, onHuy, onGui }) {
  const [duLieu, setDuLieu] = useState(duLieuBanDau);
  const [loi, setLoi] = useState({});
  const hoTenRef = useRef(null);

  useEffect(() => {
    hoTenRef.current?.focus();
  }, []);

  const kiemTra = (tenTruong, giaTri) => {
    const giaTriDaCat = giaTri.trim();
    if (tenTruong === 'hoTen' && !giaTriDaCat) return 'Vui lòng nhập họ tên.';
    if (tenTruong === 'soDienThoai' && !/^0\d{9}$/.test(giaTriDaCat)) {
      return 'Số điện thoại phải gồm 10 chữ số và bắt đầu bằng 0.';
    }
    return '';
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDuLieu((duLieuHienTai) => ({ ...duLieuHienTai, [name]: value }));
    if (loi[name]) setLoi((loiHienTai) => ({ ...loiHienTai, [name]: kiemTra(name, value) }));
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    setLoi((loiHienTai) => ({ ...loiHienTai, [name]: kiemTra(name, value) }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const loiMoi = {
      hoTen: kiemTra('hoTen', duLieu.hoTen),
      soDienThoai: kiemTra('soDienThoai', duLieu.soDienThoai),
    };
    setLoi(loiMoi);
    if (Object.values(loiMoi).some(Boolean)) return;

    onGui({
      hoTen: duLieu.hoTen.trim(),
      soDienThoai: duLieu.soDienThoai.trim(),
      ghiChu: duLieu.ghiChu.trim(),
    });
  };

  return (
    <div role="dialog" aria-modal="true" aria-labelledby="form-dat-mon-title" style={{ position: 'fixed', inset: 0, zIndex: 10, display: 'grid', placeItems: 'center', padding: '20px', background: 'rgba(0, 0, 0, 0.45)' }}>
      <form onSubmit={handleSubmit} style={{ width: 'min(100%, 420px)', padding: '24px', borderRadius: '8px', background: '#fff', textAlign: 'left', boxShadow: '0 8px 30px rgba(0, 0, 0, 0.2)' }}>
        <h2 id="form-dat-mon-title" style={{ marginBottom: '18px' }}>Thông tin đặt món</h2>
        <label htmlFor="ho-ten">Họ tên</label>
        <input ref={hoTenRef} id="ho-ten" name="hoTen" value={duLieu.hoTen} onChange={handleChange} onBlur={handleBlur} aria-invalid={Boolean(loi.hoTen)} aria-describedby={loi.hoTen ? 'loi-ho-ten' : undefined} autoComplete="name" style={{ display: 'block', boxSizing: 'border-box', width: '100%', marginTop: '6px', padding: '10px' }} />
        {loi.hoTen && <p id="loi-ho-ten" className="loi" role="alert" style={{ color: '#b42318', marginTop: '4px' }}>{loi.hoTen}</p>}
        <label htmlFor="so-dien-thoai" style={{ display: 'block', marginTop: '14px' }}>Số điện thoại</label>
        <input id="so-dien-thoai" name="soDienThoai" type="tel" value={duLieu.soDienThoai} onChange={handleChange} onBlur={handleBlur} aria-invalid={Boolean(loi.soDienThoai)} aria-describedby={loi.soDienThoai ? 'loi-so-dien-thoai' : undefined} autoComplete="tel" style={{ display: 'block', boxSizing: 'border-box', width: '100%', marginTop: '6px', padding: '10px' }} />
        {loi.soDienThoai && <p id="loi-so-dien-thoai" className="loi" role="alert" style={{ color: '#b42318', marginTop: '4px' }}>{loi.soDienThoai}</p>}
        <label htmlFor="ghi-chu" style={{ display: 'block', marginTop: '14px' }}>Ghi chú</label>
        <textarea id="ghi-chu" name="ghiChu" rows="3" value={duLieu.ghiChu} onChange={handleChange} onBlur={handleBlur} style={{ display: 'block', boxSizing: 'border-box', width: '100%', marginTop: '6px', padding: '10px', resize: 'vertical' }} />
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
          <button type="button" onClick={onHuy}>Hủy</button>
          <button type="submit" disabled={!choPhepGui}>Gửi đơn</button>
        </div>
      </form>
    </div>
  );
}