/**
 * Rota Next.js que serve /.well-known/assetlinks.json
 *
 * Digital Asset Links — usado pelo Android (TWA) para verificar que
 * este site e o app Android pertencem ao mesmo dono.
 *
 * 🔑 Como usar (depois de gerar o AAB com Bubblewrap):
 *
 * 1. Gere o app Android com Bubblewrap:
 *    `npx @bubblewrap/cli init --manifest=https://adestrapet.vercel.app/manifest.webmanifest`
 *    Bubblewrap vai gerar um `assetlinks.json` com o `package_name` e o
 *    `sha256_fingerprint` do seu keystore.
 *
 * 2. Abra esse arquivo gerado e copie o conteúdo.
 *
 * 3. Substitua o array `statements` abaixo pelo conteúdo gerado.
 *
 * 4. Faça commit + push. A Vercel vai servir o novo assetlinks.json.
 *
 * 5. Verifique com:
 *    curl https://adestrapet.vercel.app/.well-known/assetlinks.json
 *
 * ⚠️ ATENÇÃO: o array abaixo é um PLACEHOLDER. Sempre que o app Android
 * for assinado (debug ou release), o fingerprint SHA-256 muda. Atualize
 * este arquivo com o fingerprint real do seu keystore de produção.
 */
export const dynamic = "force-static";

export async function GET() {
  const statements = [
    {
      relation: ["delegate_permission/common.handle_all_urls"],
      target: {
        namespace: "android_app",
        package_name: "app.vercel.adestrapet.twa",
        sha256_cert_fingerprints: [
          // PLACEHOLDER — substitua pelo fingerprint do seu keystore Android
          // após gerar o AAB com Bubblewrap.
          // Gere com:  keytool -list -v -keystore my-release-key.jks | grep SHA256
          "00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00",
        ],
      },
    },
  ];

  return new Response(JSON.stringify(statements), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
