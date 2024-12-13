useEffect ve axios: useEffect hook'u ile bileşen yüklendiğinde (componentDidMount gibi) axios aracılığıyla API'ye istek gönderiyoruz ve dönen ürünleri state'e kaydediyoruz.

products.map(): Gelen ürünleri, map fonksiyonu ile dönüyoruz ve her ürün için bir kutu (product-box) oluşturuyoruz.

Hover Efekti: Kutulara hover yapıldığında fiyat ve sepete ekle butonu gösterilecek. Bu, CSS'teki opacity geçişi ile sağlanıyor.

Responsive Tasarım: grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); ile her ekran boyutunda ürün kutuları otomatik olarak yan yana dizilir.
