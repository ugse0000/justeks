package com.justeks.storage;

import com.justeks.common.InvalidUploadException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.io.TempDir;
import org.springframework.mock.web.MockMultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class LocalStorageServiceTest {

    @TempDir
    Path tempDir;

    LocalStorageService storage;

    @BeforeEach
    void setUp() {
        storage = new LocalStorageService(tempDir.toString());
    }

    private MockMultipartFile file(String name, String contentType, byte[] content) {
        return new MockMultipartFile("files", name, contentType, content);
    }

    private MockMultipartFile pdf(String name) {
        return file(name, "application/pdf", "a specification".getBytes());
    }

    @Test
    void gecerliDosyaUuidAdiylaSaklanir() {
        var stored = storage.store(pdf("Linen spec.pdf"));

        assertThat(stored.key()).endsWith(".pdf");
        assertThat(stored.originalFilename()).isEqualTo("Linen spec.pdf");
        assertThat(stored.sizeBytes()).isEqualTo("a specification".length());
        // Gönderenin adı diske hiç yazılmaz.
        assertThat(stored.key()).doesNotContain("Linen", "spec ");
        assertThat(tempDir.resolve(stored.key())).exists();
    }

    @Test
    void yolKacisiDenemesiDiskteEtkiYaratmaz() {
        var stored = storage.store(pdf("../../../etc/passwd.pdf"));

        // Anahtar UUID'dir; dosya kökün içinde kalır.
        assertThat(tempDir.resolve(stored.key()).normalize()).startsWith(tempDir);
        assertThat(stored.originalFilename()).doesNotContain("..");
    }

    @Test
    void izinsizUzantiReddedilir() {
        assertThatThrownBy(() -> storage.store(file("payload.exe", "application/octet-stream", new byte[] {1})))
            .isInstanceOf(InvalidUploadException.class);
    }

    @Test
    void uzantiIleTipUyusmazsaReddedilir() {
        // Uzantı whitelist'te olsa bile beyan edilen tiple tutarlı olmalı.
        assertThatThrownBy(() -> storage.store(file("invoice.pdf", "text/html", new byte[] {1})))
            .isInstanceOf(InvalidUploadException.class);
    }

    @Test
    void uzantisizDosyaReddedilir() {
        assertThatThrownBy(() -> storage.store(file("README", "application/pdf", new byte[] {1})))
            .isInstanceOf(InvalidUploadException.class);
    }

    @Test
    void bosDosyaReddedilir() {
        assertThatThrownBy(() -> storage.store(file("empty.pdf", "application/pdf", new byte[0])))
            .isInstanceOf(InvalidUploadException.class);
    }

    @Test
    void buyukDosyaReddedilir() {
        var tooBig = new byte[(int) UploadRules.MAX_FILE_BYTES + 1];
        assertThatThrownBy(() -> storage.store(file("big.pdf", "application/pdf", tooBig)))
            .isInstanceOf(InvalidUploadException.class)
            .hasMessageContaining("10 MB");
    }

    @Test
    void dosyaSayisiSiniriUygulanir() {
        var six = java.util.stream.IntStream.range(0, 6)
            .mapToObj(i -> (org.springframework.web.multipart.MultipartFile) pdf("f" + i + ".pdf"))
            .toList();

        assertThatThrownBy(() -> storage.storeAll(six))
            .isInstanceOf(InvalidUploadException.class)
            .hasMessageContaining("no more than 5");
    }

    @Test
    void topluYuklemedeBirDosyaBozuksaHicbiriKalmaz() {
        // Yarım yüklenmiş bir talep diskte artık bırakmamalı.
        var files = java.util.List.<org.springframework.web.multipart.MultipartFile>of(
            pdf("good.pdf"), file("bad.exe", "application/octet-stream", new byte[] {1}));

        assertThatThrownBy(() -> storage.storeAll(files)).isInstanceOf(InvalidUploadException.class);

        assertThat(tempDir.toFile().listFiles()).isEmpty();
    }

    @Test
    void bizimOlmayanAnahtarOkunamaz() {
        for (var key : java.util.List.of("../../../etc/passwd", "not-a-uuid.pdf", "", "..")) {
            assertThatThrownBy(() -> storage.load(key))
                .as("anahtar: %s", key)
                .isInstanceOf(InvalidUploadException.class);
        }
    }

    @Test
    void silmeDosyayiKaldirir() throws Exception {
        var stored = storage.store(pdf("spec.pdf"));
        assertThat(tempDir.resolve(stored.key())).exists();

        storage.delete(stored.key());

        assertThat(Files.exists(tempDir.resolve(stored.key()))).isFalse();
    }

    @Test
    void yuklenenDosyaGeriOkunabilir() throws Exception {
        var stored = storage.store(pdf("spec.pdf"));

        var content = storage.load(stored.key()).getContentAsByteArray();

        assertThat(new String(content)).isEqualTo("a specification");
    }
}
