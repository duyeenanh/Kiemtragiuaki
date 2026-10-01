import MonAnCard from './MonAnCard';

export default function DanhSachMon({ danhSach, onChonMon }) {
  return (
    <div className="danh-sach-mon" data-testid="danh-sach-mon" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
      {danhSach && danhSach.length > 0 ? (
        danhSach.map((mon) => (
          <MonAnCard key={mon.id} mon={mon} onChonMon={onChonMon} />
        ))
      ) : (
        <p style={{ fontStyle: 'italic', color: '#666' }}>Không tìm thấy món ăn phù hợp.</p>
      )}
    </div>
  );
}