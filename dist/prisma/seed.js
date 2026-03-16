"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const client_1 = require("@prisma/client");
const bcryptjs_1 = require("bcryptjs");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('🌱 Seeding database...');
    const demoPasswordHash = await (0, bcryptjs_1.hash)('123456', 10);
    await prisma.message.deleteMany();
    await prisma.listingApplication.deleteMany();
    await prisma.listing.deleteMany();
    await prisma.activeLocation.deleteMany();
    await prisma.sitterReview.deleteMany();
    await prisma.review.deleteMany();
    await prisma.badge.deleteMany();
    await prisma.pet.deleteMany();
    await prisma.ownerProfile.deleteMany();
    await prisma.messageThread.deleteMany();
    await prisma.sitter.deleteMany();
    await prisma.user.deleteMany();
    const ownerUser = await prisma.user.create({
        data: {
            email: 'owner@evcilmobil.com',
            passwordHash: demoPasswordHash,
            role: client_1.UserRole.OWNER,
        },
    });
    const ownerProfile = await prisma.ownerProfile.create({
        data: {
            userId: ownerUser.id,
            fullName: 'Ayse Yilmaz',
            roleLabel: 'Hayvan Sahibi',
            district: 'Kadikoy',
            city: 'Istanbul',
            avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB7E0VNdk4zB2SMN2HghbUaIPF56bTGzVgM6GDjumrenF3or_jdrVxS7cTtRsQjegd6Bx6UE9TJXDE5k65vsH97pTnEz_XyB_Bc5z7Nyrq3juMBZ0F-7jpyXSJ3U_pNYdAKqKPGlchOLNRwiERSzLNVQUsZ-BrgIVuJPPB9XS93pHeKcYxax9iMp7C1rgZOoDDV2C7dIbAAHgaB1N8Fauxs1HtCurTAuR5z93RQtdKXPHf74hFyjboUxwiBX8Aq_NyHdlhzgVcCyGkS',
            about: 'I am a graphic designer who loves animals. I live in Istanbul with Pamuk and Max and value safe and joyful care when I travel.',
            averageRating: 4.9,
            pets: {
                create: [
                    {
                        name: 'Pamuk',
                        breed: 'British Shorthair',
                        photoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5nTUX1B0bPJUyUI42ma0j981VXlOPdCvooP-ILRO_T0SRmD5pmQPRJga1UKKsjbMbkV5oAZqSGUwk-MGSq31Y9Jxe7d3m_j6Tj_XK4__II5Xpi_gkZAmFBhixciPQSiLP5Bg1oVzwRcUssWNq_WnC3b0ZYURnH6cP1hF-vXnyJiPaMkryp4WC8F8VaKLeVGh1q2tzZ_KpulZ-PuCq5fLXTu7kciVnkwdBeKSqOXnUsV7l59HDA7bfCBa1xP-zNP5AqmexVI-lDS8c',
                    },
                    {
                        name: 'Max',
                        breed: 'Golden Retriever',
                        photoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDgc3J7HEGo4RlDHMqLEYcUAZU3SpLOBG6IoCgha-oWu_ew78WoOK4XW765iKqU5kW0drnNFUiOKlmpQQ7TMxdAWHLrAXX47cxIwDaSf3AOh8i-nK9EvU-IDp0X1Gom6rh9znkFIaxtI8LswGWNb7m7gpxQwWtUwlX7KC3R3PFoLIpXSStw4tDomxP8Shq58iZ11Mtp2qSDA0xVZcHYDxZZ1lBSiYBmntkmxib9eGIQz7_N-2Ku_A_0gLhUcFvV9Y2GK0egQras1gKu',
                    },
                ],
            },
            badges: {
                create: [
                    { title: 'Reliable Owner', icon: 'security' },
                    { title: 'On Time', icon: 'schedule' },
                    { title: 'Super Parent', icon: 'favorite' },
                ],
            },
            reviews: {
                create: [
                    {
                        authorName: 'Mehmet K',
                        authorAvatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDMM_fxLmJuobkF75bv2zvg74ut-81qYBMSavFEnx06452m_V7Jbo72y1FeFiHTaIXfhQIl4qrpbGzxuwwOkQ94PiUWdNd4m8IVi3GRC-OcikrhHzDd6gymp_e9cSGkMuzUxk9L1RDiA67yweUxC4wHbSm6IZbv6KKTcxjJwPiKp9sJ_59ivzFXn19zISJe06Xh4O9qsunO8V6QN9CxQ0vWE0LPM3li8bOjnlPrpbf6c-XbQQxXZAkEGs9keZNO4svIiVhULNQmPB9m',
                        rating: 5,
                        comment: 'Ayse was very kind and organized. It was a smooth and comfortable care process.',
                    },
                ],
            },
        },
    });
    const sitterSeeds = [
        {
            email: 'elif.sitter@evcilmobil.com',
            fullName: 'Elif Yilmaz',
            city: 'Istanbul',
            district: 'Besiktas',
            about: 'Kopek gezdirme, evde bakim ve gece konaklama hizmetlerinde deneyimli bir bakiciyim. Her rezervasyonda duzenli gorsel guncelleme ve guvenli rutin takibi sagliyorum.',
            yearsExperience: 5,
            identityVerified: true,
            repeatClientRate: 85,
            rating: 4.9,
            reviewCount: 124,
            pricePerDay: 250,
            pricePerHour: 120,
            avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDOabkVOuZr41UpLU6Iowxsv1v8aLP82JHPHv8sIEVuuw7O5WledAgLuR2LKXzMeUZYkPwWr6GC0F1UMpmUrtiCEVqX6AysS9iuDCdcw8LVElUvZuWSXW2hNv2r-1e2tpG9Vb4i5ci95OYJDYY5eEOXAVZNxFsoTKq8M6Ptt0ispGlmXC6UxHJc6lzydll-PWPsnWsW2j52Qvkh0GCWKDBtFWTBzU5WlnJlV2Cd0mXhm8kT0hAtMPBElyN8d7V84fADzJ_ikWfwW7Xp',
            isFeatured: true,
            tags: ['overnight', 'walking'],
            galleryImageUrls: [
                'https://lh3.googleusercontent.com/aida-public/AB6AXuDbqYOEqrrI2jOdLDnxqRuoEP9otIgbJgCf0UIYY0xnunv9lacFbt9wq1FhN_xfF5-Ae3b26dM5dams-jJy9tduWRWqdfcVNFCiab5iPQ1eeulewInfYErTsrRS8FNbw29fth2QA4uo4u8MeVqoZNN8loLWvJpG0Oj5aFNipwmS_uc8rHGYDwOyPsmurUteb3PowbUGemzsVhIlCGecq1UwwnIrxPa3nvj2yaywxtJZh7aBuM4ruNUm51LMd0GdaBCsolfP0R3PXuGF',
                'https://lh3.googleusercontent.com/aida-public/AB6AXuDWyAtqRC82d4xuVviKmfsqQ_5fsmNsCwzrVg5RV4aUzBfgrw0d1_M38LGPdZ0lMhMXx9YvPjSzN90ghLiiGw8uhLwHYBKt8qtrh5aN8rM9TSrPPn7fixI8hYRECoM1HERJJT5jVV1nw0WFc0orOZikyJCCRrBcgCCiE-J8Ja7N6pfcAJhjbd1b2JLngzTHAGfMMV02z61Y1FnxWn2cgpJgykMSlXWX6OHuTXPfXnVSViKndTV-wXUe35_7txZQcUtMRxrR_sZF8RH_',
                'https://lh3.googleusercontent.com/aida-public/AB6AXuDtTuMnXJux1kl1DCMHxmh_0QUq2R3rHBrA8vdBxnZEkreSUE354TJ9bcoM7-Km8HHy-ncgYs6R6xZJKrzXO4CRbravS8x_iQo0khuOvj1PU6fSG7UszKmmeUfdAoAQvVqyLbCzVUismWz5ZcfxHnRJEreK-7BnxoT8gh-gsaLjtPEKFTfHLHNCNPglCFBnGXIVAYk1pZmGEj1crKN27H45qBzO08GOLVnFxE9v-CSQezRcq-wsA2Dx98D2hwxL3rJQKlG8mHroufDF',
                'https://lh3.googleusercontent.com/aida-public/AB6AXuASNOT8cXzET3EZyMejIqjOLNkDk5OF-LpbsmhQsk6m-1JB8uyHpElBZq2ySLlok6kcw8ehEi6yTKq2V_eJ1eHWc0QM_0j7FBQjOP_75a1Gvt11WprX1H41DZIudsMFUczORuXx9S_z8NyeDZsiGzuGQPg79lEuBiQCN8-0wAKLRivOad_ZpJbZu20c2UImlrampLhXP_2zuRVp1J0O4Io5STvRa5iMk_MYrM2ZdleuDCyQEpfOkmyepeGdOfXZhXWPE3a1Xj5WrYOp',
            ],
            reviews: [
                {
                    authorName: 'Mehmet K.',
                    authorAvatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAEiVqPNJ2vkn1KAbyRIGk8f8YDU3k3aEaqx3rUJ40mrkZK6Abq408FOKk6RPiHeAQKaGAeowLrD4gIYEid0zf679WOsJZG--1Od12csj5qQdsmiJK9yJmd162MzJHsTE_WLN3BTNdO5yztJadVH8ZVBkGKbp6MkU-1G2wz1JjJl1cSD-r8fLGAoDwM5723igkOiAQh3zmZMCHuBC36KcUREfkHZLG4o3UcTdtL2E2sdSCVAB4YNqjHUrE6Tc9PUu-fC8oHjgYZpnwf',
                    rating: 5,
                    comment: 'Elif, Max ile harika ilgilendi. Tum gun fotograf ve not gonderdi.',
                    timeLabel: '2 gun once',
                },
                {
                    authorName: 'Ayse S.',
                    authorAvatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuANjnqlhCHxmscHGNfJQESDgqSyJbu9YbyDZ2U6j5nCLgfi8xzs2rZOIYScirVM6Xwjox5NEi7N8FmBIytmdrckPiVd6zJjZQJRtQsLBechV9n1tqCQvNWOVRr4OiiLxQNtVbYGevpnG5HR9aZlAyyNsnIRsG8FsRjaRqAkW-kud6tzx8Q2g6Gi3RVqlVX1cezuVQxrsc0um5Bm75AwZjJeQphMehiRImuC-JXQUncMGltgRl3vY-1C3p1YUbvTmC0dNK5co0W9Li4X',
                    rating: 5,
                    comment: 'Guvenilir, profesyonel ve cok sicak iletisim kuruyor. Tekrar calisacagiz.',
                    timeLabel: '1 hafta once',
                },
            ],
            services: [
                {
                    title: 'Dog Walking',
                    description: '45 dakikalik aktif yuruyus',
                    price: 250,
                    unit: '/walk',
                    icon: 'directions-walk',
                    isFeatured: true,
                },
                {
                    title: 'Overnight Boarding',
                    description: 'Ev ortaminda gece konaklamali bakim',
                    price: 450,
                    unit: '/night',
                    icon: 'hotel',
                    isFeatured: true,
                },
                {
                    title: 'Pet Sitting',
                    description: 'Gun icinde birebir ilgi ve beslenme takibi',
                    price: 350,
                    unit: '/day',
                    icon: 'pets',
                    isFeatured: false,
                },
            ],
            latitude: 41.043,
            longitude: 29.007,
        },
        {
            email: 'can.sitter@evcilmobil.com',
            fullName: 'Can Demir',
            city: 'Istanbul',
            district: 'Kadikoy',
            about: 'Evde konaklama ve gunluk bakim hizmetlerinde sakin, duzenli ve guvenli bir ortam sunuyorum. Ozellikle rutini seven dostlarla uyumlu calisiyorum.',
            yearsExperience: 4,
            identityVerified: true,
            repeatClientRate: 79,
            rating: 4.8,
            reviewCount: 92,
            pricePerDay: 300,
            pricePerHour: 95,
            avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDX5PU29ffd3IRen0KM6ZaapYg-TtDnb4xGDSTSYU2PUtbmS6dnrcbltEtkYUyvaFzm6wTD9ii9gLF9gImrpZ930RED-Rk3IpVFcoFOQTI9ZRrXYgKbScOKYMHJY7ZbhVHO7d8lzT2PJKi1l3IUZBxeJlfgjbMy4DDj5cPehKVCFC2k6ZH_Is9dAMt2vKpzCtjnskPlmjDfECGvMOR4RAkWquqDRShKYJKXZiuVnEAA92_Cg-OufN_R5uS-7SUtgdpaWB62F_Go1c9j',
            isFeatured: true,
            tags: ['boarding', 'daily-care'],
            galleryImageUrls: [
                'https://lh3.googleusercontent.com/aida-public/AB6AXuDPFLI5_WGODfCu-mKinohWYEEf7q2Y0VhqpKhfUg_J49KdPo5jxj9TcMgxcNmtpzluXQFDM8CpO4Q0R2f-KqMusptOB3xgUjHWStRP4YI8d5TmKxdzMGutzqFS0W1Apr5jcA5M7yklH49oCQhzJs3gZwwqVRKUGC_daZCswFKhRXdRLZ_1whxezDvqd_tetBiSKHMFZeWTZWphl3fySsOZ0i85qGxnSDdDdBrVHeVjwDNM-_Lqc5AezXeYoB4Qv7EtHfvrRW9pIirk',
                'https://lh3.googleusercontent.com/aida-public/AB6AXuASNOT8cXzET3EZyMejIqjOLNkDk5OF-LpbsmhQsk6m-1JB8uyHpElBZq2ySLlok6kcw8ehEi6yTKq2V_eJ1eHWc0QM_0j7FBQjOP_75a1Gvt11WprX1H41DZIudsMFUczORuXx9S_z8NyeDZsiGzuGQPg79lEuBiQCN8-0wAKLRivOad_ZpJbZu20c2UImlrampLhXP_2zuRVp1J0O4Io5STvRa5iMk_MYrM2ZdleuDCyQEpfOkmyepeGdOfXZhXWPE3a1Xj5WrYOp',
                'https://lh3.googleusercontent.com/aida-public/AB6AXuDbqYOEqrrI2jOdLDnxqRuoEP9otIgbJgCf0UIYY0xnunv9lacFbt9wq1FhN_xfF5-Ae3b26dM5dams-jJy9tduWRWqdfcVNFCiab5iPQ1eeulewInfYErTsrRS8FNbw29fth2QA4uo4u8MeVqoZNN8loLWvJpG0Oj5aFNipwmS_uc8rHGYDwOyPsmurUteb3PowbUGemzsVhIlCGecq1UwwnIrxPa3nvj2yaywxtJZh7aBuM4ruNUm51LMd0GdaBCsolfP0R3PXuGF',
            ],
            reviews: [
                {
                    authorName: 'Can O.',
                    authorAvatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQ95yukwHsjVtftwShXBRAST044JNTrTxqw-e6UcF4eEz4ViVcZiAV4o5KlaFTQjK_kRC4Tn-aaFXjE0nz-GKl5EueHL4r4fgXyc0sEAEWx3zPlRr7GbrU4HhQHXosjxytsAIQUsd8TGJFpuymZS8eyiX6wHHvYTBc0CrKarork1G3h0yY4K2kCcPb1_32wu015mm27j_abmaEKQzzMsXmIYsDsgVXSy2yzDO_TmIZsMyvxDCANMGnY4lQCHsXYFBCRV_py15nwe1u',
                    rating: 5,
                    comment: 'Cok duzenli bir bakim sureciydi. Ozellikle beslenme takibi kusursuzdu.',
                    timeLabel: '4 gun once',
                },
                {
                    authorName: 'Selin D.',
                    authorAvatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDEmO2UCEn54UZHUWaJvZBniUGlpIu6fN9ynGKh6AexhtHTWPF7pNUfPGkKHpsaSoLxMKkEX6OvqNOqkBc9KFxzfRQZ-Gl3SVDdMtKcm2Epq_rSUmOZQQg6oHXU9QvuHw56K2gvY4IBYrHQkXWC7D-XtxYNoy3nElckgdBNwrpgYT49MILihGkRik2pxqgkdeMRO0wKWxMnqT_s5tFgPrvt-dVKZlKKTJ3XJdvXz28LG4OUfeAlTX81Bbb9hOAPa4x7AQvMXBhqfLSj',
                    rating: 4,
                    comment: 'Iletisim kuvvetliydi ve evcil dostumuz rahat bir surec gecirdi.',
                    timeLabel: '2 hafta once',
                },
            ],
            services: [
                {
                    title: 'Home Boarding',
                    description: 'Bakici evinde guvenli konaklama',
                    price: 300,
                    unit: '/day',
                    icon: 'home',
                    isFeatured: true,
                },
                {
                    title: 'Daily Pet Sitting',
                    description: 'Gun icinde oyun, beslenme ve ilac takibi',
                    price: 340,
                    unit: '/day',
                    icon: 'pets',
                    isFeatured: true,
                },
            ],
            latitude: 40.991,
            longitude: 29.036,
        },
        {
            email: 'zeynep.sitter@evcilmobil.com',
            fullName: 'Zeynep Derin',
            city: 'Istanbul',
            district: 'Atasehir',
            about: 'Ozellikle yuksek enerjili kopeklerle calismayi seviyorum. Her hizmette guvenli aktivite, duzenli raporlama ve net iletisim sunuyorum.',
            yearsExperience: 6,
            identityVerified: true,
            repeatClientRate: 88,
            rating: 5,
            reviewCount: 141,
            pricePerDay: 320,
            pricePerHour: 150,
            avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuClX4JbfbXkLLV9-RYZp233Gt6y5hpeZnG0vxI3zsItSY5ygwqizxRmvOF6cvSRCQUotzGR4YuKaYGfdZxOqYsHviIjZ3Fv8K_WhithY15hw5K2yT-EjcgcC8r8UpNooih7ChhWeRXKjFSTrJk34yXDXjBKAEevAwu7IWHIV9u3CO7bM0fNvUWz9dvCFZBqxt3Amo_lBcZWUuFdk5Sg9pRxpZz-04gNpnP45WheX55ImTMAvhHmDm2u16ytQ_U6UWmNq3MTzEyXxJqM',
            isFeatured: false,
            tags: ['walking'],
            galleryImageUrls: [
                'https://lh3.googleusercontent.com/aida-public/AB6AXuDtTuMnXJux1kl1DCMHxmh_0QUq2R3rHBrA8vdBxnZEkreSUE354TJ9bcoM7-Km8HHy-ncgYs6R6xZJKrzXO4CRbravS8x_iQo0khuOvj1PU6fSG7UszKmmeUfdAoAQvVqyLbCzVUismWz5ZcfxHnRJEreK-7BnxoT8gh-gsaLjtPEKFTfHLHNCNPglCFBnGXIVAYk1pZmGEj1crKN27H45qBzO08GOLVnFxE9v-CSQezRcq-wsA2Dx98D2hwxL3rJQKlG8mHroufDF',
                'https://lh3.googleusercontent.com/aida-public/AB6AXuDWyAtqRC82d4xuVviKmfsqQ_5fsmNsCwzrVg5RV4aUzBfgrw0d1_M38LGPdZ0lMhMXx9YvPjSzN90ghLiiGw8uhLwHYBKt8qtrh5aN8rM9TSrPPn7fixI8hYRECoM1HERJJT5jVV1nw0WFc0orOZikyJCCRrBcgCCiE-J8Ja7N6pfcAJhjbd1b2JLngzTHAGfMMV02z61Y1FnxWn2cgpJgykMSlXWX6OHuTXPfXnVSViKndTV-wXUe35_7txZQcUtMRxrR_sZF8RH_',
                'https://lh3.googleusercontent.com/aida-public/AB6AXuAEiVqPNJ2vkn1KAbyRIGk8f8YDU3k3aEaqx3rUJ40mrkZK6Abq408FOKk6RPiHeAQKaGAeowLrD4gIYEid0zf679WOsJZG--1Od12csj5qQdsmiJK9yJmd162MzJHsTE_WLN3BTNdO5yztJadVH8ZVBkGKbp6MkU-1G2wz1JjJl1cSD-r8fLGAoDwM5723igkOiAQh3zmZMCHuBC36KcUREfkHZLG4o3UcTdtL2E2sdSCVAB4YNqjHUrE6Tc9PUu-fC8oHjgYZpnwf',
            ],
            reviews: [
                {
                    authorName: 'Mert A.',
                    authorAvatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAEiVqPNJ2vkn1KAbyRIGk8f8YDU3k3aEaqx3rUJ40mrkZK6Abq408FOKk6RPiHeAQKaGAeowLrD4gIYEid0zf679WOsJZG--1Od12csj5qQdsmiJK9yJmd162MzJHsTE_WLN3BTNdO5yztJadVH8ZVBkGKbp6MkU-1G2wz1JjJl1cSD-r8fLGAoDwM5723igkOiAQh3zmZMCHuBC36KcUREfkHZLG4o3UcTdtL2E2sdSCVAB4YNqjHUrE6Tc9PUu-fC8oHjgYZpnwf',
                    rating: 5,
                    comment: 'Yuksek enerjili kopegimizle cok iyi anlasti. Aktivite duzeyi tam istedigimiz gibiydi.',
                    timeLabel: '3 gun once',
                },
            ],
            services: [
                {
                    title: 'Dog Walking',
                    description: 'Enerjik dostlar icin tempolu park yuruyusu',
                    price: 320,
                    unit: '/walk',
                    icon: 'directions-walk',
                    isFeatured: true,
                },
                {
                    title: 'Outdoor Play Session',
                    description: 'Oyun, enerji bosaltma ve temel komut takibi',
                    price: 380,
                    unit: '/session',
                    icon: 'pets',
                    isFeatured: false,
                },
            ],
            latitude: 40.992,
            longitude: 29.108,
        },
    ];
    const createdSitters = [];
    for (const seed of sitterSeeds) {
        const user = await prisma.user.create({
            data: {
                email: seed.email,
                passwordHash: demoPasswordHash,
                role: client_1.UserRole.SITTER,
            },
        });
        const sitter = await prisma.sitter.create({
            data: {
                userId: user.id,
                fullName: seed.fullName,
                city: seed.city,
                district: seed.district,
                about: seed.about,
                yearsExperience: seed.yearsExperience,
                identityVerified: seed.identityVerified,
                repeatClientRate: seed.repeatClientRate,
                galleryImageUrls: seed.galleryImageUrls,
                rating: seed.rating,
                reviewCount: seed.reviewCount,
                pricePerDay: seed.pricePerDay,
                pricePerHour: seed.pricePerHour,
                avatarUrl: seed.avatarUrl,
                isFeatured: seed.isFeatured,
                tags: seed.tags,
            },
        });
        if (seed.reviews.length > 0) {
            await prisma.sitterReview.createMany({
                data: seed.reviews.map((review) => ({
                    sitterId: sitter.id,
                    authorName: review.authorName,
                    authorAvatarUrl: review.authorAvatarUrl,
                    rating: review.rating,
                    comment: review.comment,
                    timeLabel: review.timeLabel,
                })),
            });
        }
        createdSitters.push({
            userId: user.id,
            sitterId: sitter.id,
            fullName: seed.fullName,
            avatarUrl: seed.avatarUrl,
            city: seed.city,
            district: seed.district,
            pricePerDay: seed.pricePerDay,
            latitude: seed.latitude,
            longitude: seed.longitude,
            primaryListingId: undefined,
            services: seed.services,
        });
    }
    console.log(`✓ Created ${createdSitters.length} sitters and sitter users`);
    const ownerListing = await prisma.listing.create({
        data: {
            title: 'Pamuk ve Max icin hafta sonu bakici ariyorum',
            description: '2 gunluk evde konaklamali bakim tercihi.',
            listingType: client_1.ListingType.OWNER_REQUEST,
            city: ownerProfile.city,
            district: ownerProfile.district,
            budgetPerDay: 450,
            isFeatured: true,
            isActive: true,
            publishedByUserId: ownerUser.id,
            ownerProfileId: ownerProfile.id,
        },
    });
    for (const sitter of createdSitters) {
        let primaryListingId;
        for (const service of sitter.services) {
            const listing = await prisma.listing.create({
                data: {
                    title: service.title,
                    description: service.description,
                    listingType: client_1.ListingType.SITTER_SERVICE,
                    city: sitter.city,
                    district: sitter.district,
                    servicePricePerDay: service.price,
                    serviceUnit: service.unit,
                    serviceIcon: service.icon,
                    isFeatured: service.isFeatured,
                    isActive: true,
                    publishedByUserId: sitter.userId,
                    sitterId: sitter.sitterId,
                },
            });
            if (!primaryListingId) {
                primaryListingId = listing.id;
            }
        }
        sitter.primaryListingId = primaryListingId;
    }
    await prisma.activeLocation.create({
        data: {
            userId: ownerUser.id,
            latitude: 40.989,
            longitude: 29.038,
            accuracy: 20,
        },
    });
    for (const sitter of createdSitters) {
        await prisma.activeLocation.create({
            data: {
                userId: sitter.userId,
                latitude: sitter.latitude,
                longitude: sitter.longitude,
                accuracy: 15,
            },
        });
    }
    const minuteMs = 60_000;
    const hourMs = 60 * minuteMs;
    const dayMs = 24 * hourMs;
    const dateFromOffset = (offsetMs) => new Date(Date.now() - offsetMs);
    const messageThreads = await Promise.all([
        prisma.messageThread.create({
            data: {
                ownerUserId: ownerUser.id,
                sitterUserId: createdSitters[0].userId,
                listingId: ownerListing.id,
                senderName: createdSitters[0].fullName,
                avatarUrl: createdSitters[0].avatarUrl,
                previewText: 'Kopeginiz Pamuk bugun cok eglendi. Fotograflari ekledim.',
                timeLabel: '35 dk',
                unreadCount: 1,
                ownerUnreadCount: 1,
                sitterUnreadCount: 0,
                isOnline: true,
                isPriority: true,
                lastMessageAt: dateFromOffset(35 * minuteMs),
                messages: {
                    create: [
                        {
                            senderUserId: ownerUser.id,
                            body: 'Merhaba Elif, hafta sonu icin musait misiniz?',
                            createdAt: dateFromOffset(2 * dayMs + 3 * hourMs),
                        },
                        {
                            senderUserId: createdSitters[0].userId,
                            body: 'Merhaba Ayse, cumartesi sabahi uygunum.',
                            createdAt: dateFromOffset(2 * dayMs + 2 * hourMs + 40 * minuteMs),
                        },
                        {
                            senderUserId: ownerUser.id,
                            body: 'Harika. Pamuk ve Max icin evde bakim dusunuyoruz.',
                            createdAt: dateFromOffset(2 * dayMs + 2 * hourMs + 10 * minuteMs),
                        },
                        {
                            senderUserId: createdSitters[0].userId,
                            body: 'Kopeginiz Pamuk bugun cok eglendi. Fotograflari ekledim.',
                            createdAt: dateFromOffset(35 * minuteMs),
                        },
                    ],
                },
            },
        }),
        prisma.messageThread.create({
            data: {
                ownerUserId: ownerUser.id,
                sitterUserId: createdSitters[1].userId,
                listingId: createdSitters[1].primaryListingId ?? ownerListing.id,
                senderName: createdSitters[1].fullName,
                avatarUrl: createdSitters[1].avatarUrl,
                previewText: 'Yarin saat 09:00da geliyorum, anahtari biraktiginiz yerde bulurum.',
                timeLabel: '12:15',
                unreadCount: 0,
                ownerUnreadCount: 0,
                sitterUnreadCount: 0,
                isOnline: false,
                isPriority: false,
                lastMessageAt: dateFromOffset(20 * hourMs),
                messages: {
                    create: [
                        {
                            senderUserId: ownerUser.id,
                            body: 'Yarin teslim icin saat 09:00 uygun mu?',
                            createdAt: dateFromOffset(22 * hourMs),
                        },
                        {
                            senderUserId: createdSitters[1].userId,
                            body: 'Yarin saat 09:00da geliyorum, anahtari biraktiginiz yerde bulurum.',
                            createdAt: dateFromOffset(20 * hourMs),
                        },
                    ],
                },
            },
        }),
        prisma.messageThread.create({
            data: {
                ownerUserId: ownerUser.id,
                sitterUserId: createdSitters[2].userId,
                listingId: createdSitters[2].primaryListingId ?? ownerListing.id,
                senderName: ownerProfile.fullName,
                avatarUrl: ownerProfile.avatarUrl,
                previewText: 'Onumuzdeki hafta sonu icin musait misiniz? Rezervasyonu onaylayabilirim.',
                timeLabel: '3 sa',
                unreadCount: 1,
                ownerUnreadCount: 0,
                sitterUnreadCount: 1,
                isOnline: false,
                isPriority: true,
                lastMessageAt: dateFromOffset(3 * hourMs),
                messages: {
                    create: [
                        {
                            senderUserId: createdSitters[2].userId,
                            body: 'Merhaba, yuksek enerjili kopeklerle deneyimim var.',
                            createdAt: dateFromOffset(dayMs + 4 * hourMs),
                        },
                        {
                            senderUserId: ownerUser.id,
                            body: 'Onumuzdeki hafta sonu icin musait misiniz? Rezervasyonu onaylayabilirim.',
                            createdAt: dateFromOffset(3 * hourMs),
                        },
                    ],
                },
            },
        }),
    ]);
    console.log('✓ Created owner and sitter listings');
    console.log('✓ Created active locations');
    console.log(`✓ Created ${messageThreads.length} message threads with history`);
    console.log('ℹ Demo users password: 123456');
    console.log('ℹ Owner login: owner@evcilmobil.com');
    console.log('ℹ Sitter login: elif.sitter@evcilmobil.com');
    console.log('✅ Database seeded successfully!');
}
main()
    .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map