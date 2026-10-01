import { useEffect, useMemo, useState } from 'react';
import Header from './components/Header';
import ThanhTimKiem from './components/ThanhTimKiem';
import DanhSachMon from './components/DanhSachMon';
import GioHang from './components/GioHang';
import FormDatMon from './components/FormDatMon';
import useLocalStorage from './hooks/useLocalStorage';

const duLieuMonAn = [
  { id: 1, ten: 'Bún bò Huế', gia: 45000, hinhAnh: '/bun-bo-hue.jpg', loai: 'nuoc' },
  { id: 2, ten: 'Cơm hến', gia: 30000, hinhAnh: '/com-hen.jpg', loai: 'kho' },
  { id: 3, ten: 'Bánh bột lọc', gia: 25000, hinhAnh: '/banh-bot-loc.jpg', loai: 'banh' },
  { id: 4, ten: 'Bánh nậm', gia: 25000, hinhAnh: '/banh-nam.jpg', loai: 'banh' },
  { id: 5, ten: 'Bánh bèo', gia: 30000, hinhAnh: '/banh-beo.jpg', loai: 'banh' },
  { id: 6, ten: 'Chè bột lọc heo quay', gia: 20000, hinhAnh: '/che-bot-loc-heo-quay.jpg', loai: 'che' },
  { id: 7, ten: 'Bún hến', gia: 30000, hinhAnh: '/bun-hen.jpg', loai: 'nuoc' },
  { id: 8, ten: 'Nem lụi', gia: 50000, hinhAnh: '/nem-lui.jpg', loai: 'khac' },
];

export default function App() {
  const [gioHang, setGioHang] = useLocalStorage('gio-hang', []);
  const [tuKhoa, setTuKhoa] = useState('');
  const [danhMucChon, setDanhMucChon] = useState('tat-ca');
  const [hienFormDatMon, setHienFormDatMon] = useState(false);
  const [khoaForm, setKhoaForm] = useState(0);
  const [thongBao, setThongBao] = useState('');
  const tenQuan = import.meta.env.VITE_TEN_QUAN || 'Quán Huế Xưa';

  // Hàm xử lý khi bấm "Chọn món" (Cộng dồn số lượng nếu đã có trong giỏ)
  const handleChonMon = (monDuocChon) => {
    setGioHang(prevGioHang => {
      const index = prevGioHang.findIndex(item => item.id === monDuocChon.id);
      if (index !== -1) {
        const gioHangMoi = [...prevGioHang];
        gioHangMoi[index] = { 
          ...gioHangMoi[index], 
          soLuong: gioHangMoi[index].soLuong + 1 
        };
        return gioHangMoi;
      } else {
        return [...prevGioHang, { ...monDuocChon, soLuong: 1 }];
      }
    });
  };

  // Tối ưu hóa tìm kiếm và lọc danh mục bằng useMemo
  const danhSachLoc = useMemo(() => {
    return duLieuMonAn.filter(mon => {
      const khopTen = mon.ten.toLowerCase().includes(tuKhoa.toLowerCase());
      const khopDanhMuc = (danhMucChon === 'tat-ca') || (mon.loai === danhMucChon);
      return khopTen && khopDanhMuc;
    });
  }, [tuKhoa, danhMucChon]);

  // Tính tổng số lượng phần ăn hiển thị lên Header
  const tongSoLuong = gioHang.reduce((total, item) => total + item.soLuong, 0);
  const choPhepGui = gioHang.length > 0;

  const guiDon = ({ hoTen }) => {
    setThongBao(`Đã nhận đơn của ${hoTen}`);
    setGioHang([]);
    setKhoaForm((khoaHienTai) => khoaHienTai + 1);
  };

  useEffect(() => {
    document.title = tongSoLuong === 0 ? tenQuan : `(${tongSoLuong}) ${tenQuan}`;
  }, [tongSoLuong, tenQuan]);

  return (
    <div className="app-container" style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '1000px', margin: '0 auto' }}>
      <Header
        soLuong={tongSoLuong}
        hanhDong={(
          <button type="button" onClick={() => setGioHang([])}>
            Xóa giỏ hàng
          </button>
        )}
      />
      {thongBao && <p role="status" aria-live="polite">{thongBao}</p>}
      
      <main style={{ marginTop: '20px' }}>
        <h2>Thực đơn Quán Huế Xưa</h2>
        
        {/* Thanh tìm kiếm và bộ lọc */}
        <ThanhTimKiem 
          tuKhoa={tuKhoa} 
          setTuKhoa={setTuKhoa} 
          danhMucChon={danhMucChon} 
          setDanhMucChon={setDanhMucChon} 
        />

        {/* Danh sách món ăn sau khi lọc */}
        <DanhSachMon danhSach={danhSachLoc} onChonMon={handleChonMon} />

        <GioHang
          gioHang={gioHang}
          danhSachMon={duLieuMonAn}
          onDatMon={() => setHienFormDatMon(true)}
        />
      </main>

      {hienFormDatMon && (
        <FormDatMon
          key={khoaForm}
          choPhepGui={choPhepGui}
          onHuy={() => setHienFormDatMon(false)}
          onGui={guiDon}
        />
      )}
    </div>
  );
}