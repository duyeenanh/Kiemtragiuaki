export default function ThanhTimKiem({ tuKhoa, setTuKhoa, danhMucChon, setDanhMucChon }) {
  const btnStyle = (isActive) => ({
    background: isActive ? '#0275d8' : '#f0f0f0',
    color: isActive ? '#fff' : '#000',
    border: '1px solid #ccc',
    padding: '8px 14px',
    cursor: 'pointer',
    borderRadius: '4px',
    fontWeight: isActive ? 'bold' : 'normal'
  });

  return (
    <div className="thanh-tim-kiem" data-testid="search-filter-container" style={{ margin: '20px 0', display: 'flex', gap: '15px', flexWrap: 'wrap', alignItems: 'center' }}>
      <input 
        type="text" 
        placeholder="Nhập tên món cần tìm..." 
        value={tuKhoa}
        onChange={(e) => setTuKhoa(e.target.value)}
        data-testid="search-input"
        style={{ padding: '8px 12px', width: '250px', borderRadius: '4px', border: '1px solid #ccc' }}
      />

      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <button onClick={() => setDanhMucChon('tat-ca')} style={btnStyle(danhMucChon === 'tat-ca')}>
          Tất cả
        </button>
        <button onClick={() => setDanhMucChon('nuoc')} style={btnStyle(danhMucChon === 'nuoc')}>
          Món Nước
        </button>
        <button onClick={() => setDanhMucChon('banh')} style={btnStyle(danhMucChon === 'banh')}>
          Bánh Huế
        </button>
        <button onClick={() => setDanhMucChon('kho')} style={btnStyle(danhMucChon === 'kho')}>
          Món Khô
        </button>
        <button onClick={() => setDanhMucChon('che')} style={btnStyle(danhMucChon === 'che')}>
          Chè
        </button>
      </div>
    </div>
  );
}