export default function MonAnCard({ mon, onChonMon }) {
  return (
    <div className="mon-card" data-testid={`mon-${mon.id}`} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', width: '200px', textAlign: 'center', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', background: '#fff' }}>
      <img 
        src={mon.hinhAnh} 
        alt={mon.ten} 
        style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '6px' }} 
      />
      <h4 style={{ margin: '10px 0 5px 0', fontSize: '16px' }}>{mon.ten}</h4>
      <p style={{ color: '#d9534f', fontWeight: 'bold', marginBottom: '10px' }}>{mon.gia.toLocaleString()} đ</p>
      <button 
        onClick={() => onChonMon(mon)} 
        data-testid={`btn-chon-${mon.id}`}
        style={{ background: '#f0ad4e', border: 'none', padding: '8px 12px', cursor: 'pointer', borderRadius: '4px', fontWeight: 'bold', width: '100%' }}
      >
        Chọn món
      </button>
    </div>
  );
}