# Redis Bağlantı ve Çökme Sorunları Raporu

Bu rapor, Kelime.com altyapısında Redis servisinin kilitlenmesine ve buna bağlı olarak frontend uygulamasının çökmesine (502/503 hataları) neden olan disk dar boğazı sorununu ve bu sorunun kalıcı çözümlerini açıklamaktadır.

---

## 1. Sorunun Teşhisi (Problem Analysis)

Redis servisinin logları incelendiğinde gün boyu defalarca tekrarlanan şu kritik uyarı tespit edilmiştir:
```text
Asynchronous AOF fsync is taking too long (disk is busy?). Writing the AOF buffer without waiting for fsync to complete, this may slow down Redis.
```

### Detaylı Hata Nedeni:
1. **AOF (Append Only File) Mekanizması:** Redis varsayılan olarak her saniye belleğindeki değişiklikleri diske yazar. Bu işlem asenkron bir thread tarafından `fsync()` sistem çağrısı ile gerçekleştirilir.
2. **Disk I/O Sıkışması (Disk is Busy):** Sunucu üzerinde MongoDB, Postgres ve uygulama logları gibi diğer yoğun I/O işlemleriyle birlikte Redis de diske yazmaya çalıştığında, diskin yazma kapasitesi (IOPS) yetersiz kalmaktadır.
3. **Redis'in Yanıtsız Kalması (Freeze):** Disk yazma işlemi 2 saniyeden uzun sürdüğünde Redis, bellek tamponlarının taşmasını önlemek amacıyla ana iş parçacığını (main thread) bloklar. Bu bloklama süresince Redis dışarıdan gelen hiçbir sorguya (Node.js) yanıt veremez.
4. **Frontend Çöküşü:** Frontend uygulaması Redis'e bağlanamadığı için hata fırlatır ve bağlantıyı sonlandırır.

---

## 2. Çözüm Yolları (Solutions)

Redis'in kilitlenmesini engellemek için üç farklı çözüm yolu mevcuttur. Kelime.com mimarisinde Redis yalnızca **session** (oturum yönetimi) ve **rate limit** (hız sınırları) için kullanıldığından **Yol A** en güvenli ve kesin çözümdür.

### Yol A: AOF (Anlık Diske Yazma) Özelliğini Kapatmak (Tavsiye Edilen)
Oturum verileri ve istek sınırlarının her saniye diske yazılması kritik değildir. Bu ayar kapatıldığında Redis sadece RAM üzerinde çalışır ve periyodik (RDB) yedekleme yapar. Disk I/O yükü sıfıra iner.

> [!TIP]
> **Uygulama Adımları:**
> 1. `/home/arif/Masaüstü/Hiperlink/kelimecom/kelimecom-frontend/docker-root.yml` dosyasını açın.
> 2. `redisdb` servis tanımındaki `command` satırını bulun:
>    ```yaml
>    command: redis-server --requirepass R3d1sP3SS --appendonly yes
>    ```
> 3. Satırı `yes` yerine `no` olarak güncelleyin:
>    ```yaml
>    command: redis-server --requirepass R3d1sP3SS --appendonly no
>    ```
> 4. Değişikliği sunucuya çekip şu komutla Redis'i yeniden başlatın:
>    ```bash
>    docker compose -f docker-root.yml up -d --force-recreate redisdb
>    ```

---

### Yol B: `no-appendfsync-on-rewrite` Özelliğini Aktifleştirmek
Eğer AOF'un tamamen kapatılması istenmiyorsa, Redis'in arka planda veri tabanı yedeği (RDB snapshot) aldığı esnada anlık diske yazma (fsync) yapması engellenir. Bu sayede diskteki çift yazma yükü hafifletilir.

> [!NOTE]
> **Uygulama Adımları:**
> 1. `docker-root.yml` dosyasında `redisdb` servisinin `command` satırını şu şekilde güncelleyin:
>    ```yaml
>    command: redis-server --requirepass R3d1sP3SS --appendonly yes --no-appendfsync-on-rewrite yes
>    ```
> 2. Değişikliği sunucuya aktarıp Redis konteynerini yeniden başlatın.

---

### Yol C: Sunucu Disk Türünü / Hızını (IOPS) Yükseltmek
Eğer sunucu disk performansı genel olarak tüm servisleri (MongoDB, Postgres, Node.js) yavaşlatıyorsa:
* Sunucu disk tipini SSD / NVMe sürücüler ile güncelleyin.
* Sanal sunucu (VM) kullanıyorsanız servis sağlayıcınızdan disk IOPS limitlerini artırın.
