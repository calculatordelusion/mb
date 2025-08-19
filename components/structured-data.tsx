export default function StructuredData() {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Text Behind Image",
    "url": "https://text-behind-image.io",
    "logo": "https://text-behind-image.io/logo.png",
    "description": "AI-powered tool for creating stunning text behind image effects",
    "foundingDate": "2024",
    "sameAs": [
      "https://twitter.com/textbehindimage",
      "https://instagram.com/textbehindimage",
      "https://facebook.com/textbehindimage"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "email": "support@text-behind-image.io"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US"
    },
    "knowsAbout": [
      "Text Behind Image Effects",
      "AI Image Processing",
      "Design Tools",
      "Social Media Design",
      "Image Text Overlay"
    ]
  };

  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Text Behind Image",
    "url": "https://text-behind-image.io",
    "description": "Transform your images with AI-powered text behind image effects",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://text-behind-image.io/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const softwareData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Text Behind Image Tool",
    "applicationCategory": "DesignApplication",
    "operatingSystem": "Web Browser",
    "url": "https://text-behind-image.io/app",
    "description": "AI-powered tool for creating text behind image effects",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "description": "Free tier available with premium features"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "1250",
      "bestRating": "5",
      "worstRating": "1"
    },
    "featureList": [
      "AI-powered text placement",
      "Multiple image formats support",
      "Real-time preview",
      "High-resolution export",
      "Custom fonts and colors",
      "Social media optimization"
    ],
    "screenshot": "https://text-behind-image.io/screenshot.jpg",
    "softwareVersion": "2.0",
    "downloadUrl": "https://text-behind-image.io/app",
    "installUrl": "https://text-behind-image.io/app",
    "applicationSubCategory": "Image Editor",
    "operatingSystem": "Any",
    "permissions": "Camera, Storage",
    "releaseNotes": "Latest version with enhanced AI text placement algorithms"
  };

  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is Text Behind Image?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Text Behind Image is an advanced AI-powered tool that allows you to create stunning visual effects by placing text behind your images. It uses sophisticated algorithms to seamlessly integrate text into your photos, creating professional-looking designs that stand out on social media and marketing materials."
        }
      },
      {
        "@type": "Question",
        "name": "How does the Text Behind Image tool work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our tool uses cutting-edge AI technology to analyze your image and intelligently place text behind objects while maintaining visual clarity. Simply upload your image, add your desired text, customize the styling, and our AI will automatically position the text to create the perfect behind-image effect."
        }
      },
      {
        "@type": "Question",
        "name": "What file formats does Text Behind Image support?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We support all major image formats including JPG, PNG, WebP, and GIF. You can upload images up to 10MB in size. For best results, we recommend using high-resolution images (at least 1920x1080 pixels) to ensure optimal quality in your final design."
        }
      },
      {
        "@type": "Question",
        "name": "Is Text Behind Image free to use?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! Text Behind Image offers a generous free tier that allows you to create unlimited designs with basic features. We also offer premium plans with advanced features like higher resolution exports, custom fonts, and priority processing for professional users."
        }
      },
      {
        "@type": "Question",
        "name": "Can I use Text Behind Image for commercial purposes?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely! All designs created with Text Behind Image are yours to use for any purpose, including commercial projects, social media marketing, advertising, and more. There are no licensing fees or restrictions on how you use your creations."
        }
      },
      {
        "@type": "Question",
        "name": "What makes Text Behind Image different from other design tools?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Unlike traditional design tools, Text Behind Image specializes in creating the unique 'text behind image' effect using AI. Our tool automatically handles the complex task of text placement and integration, saving you hours of manual work while delivering professional results that would be difficult to achieve with other software."
        }
      },
      {
        "@type": "Question",
        "name": "How do I get the best results with Text Behind Image?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "For optimal results, use high-contrast images with clear subjects, choose readable fonts and colors that complement your image, and experiment with different text placements. Our AI will guide you to the best positioning, but you can always fine-tune the results to match your vision."
        }
      },
      {
        "@type": "Question",
        "name": "Can I edit my designs after creating them?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! All your designs are saved in your account and can be edited at any time. You can modify text content, styling, positioning, and even upload new images while keeping your original text settings. This makes it easy to create variations of your designs."
        }
      }
    ]
  };

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://text-behind-image.io"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Text Behind Image Tool",
        "item": "https://text-behind-image.io/app"
      }
    ]
  };

  const howToData = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Use Text Behind Image Tool",
    "description": "Step-by-step guide to create stunning text behind image effects",
    "image": "https://text-behind-image.io/how-to-guide.jpg",
    "totalTime": "PT5M",
    "estimatedCost": {
      "@type": "MonetaryAmount",
      "currency": "USD",
      "value": "0"
    },
    "supply": [
      {
        "@type": "HowToSupply",
        "name": "Image file (JPG, PNG, WebP)"
      },
      {
        "@type": "HowToSupply",
        "name": "Text content"
      }
    ],
    "tool": [
      {
        "@type": "HowToTool",
        "name": "Text Behind Image Tool"
      }
    ],
    "step": [
      {
        "@type": "HowToStep",
        "name": "Upload Your Image",
        "text": "Drag and drop your image or click to browse. We support JPG, PNG, and WebP formats up to 10MB.",
        "image": "https://text-behind-image.io/step1.jpg"
      },
      {
        "@type": "HowToStep",
        "name": "Add Your Text",
        "text": "Enter the text you want to place behind your image. Customize font, size, color, and position.",
        "image": "https://text-behind-image.io/step2.jpg"
      },
      {
        "@type": "HowToStep",
        "name": "Adjust & Preview",
        "text": "Fine-tune the text placement, opacity, and effects. See real-time preview of your creation.",
        "image": "https://text-behind-image.io/step3.jpg"
      },
      {
        "@type": "HowToStep",
        "name": "Download & Share",
        "text": "Download your masterpiece in high quality. Share directly to social media or save for later use.",
        "image": "https://text-behind-image.io/step4.jpg"
      }
    ]
  };

  const articleData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Text Behind Image: The Ultimate AI-Powered Design Tool",
    "description": "Transform your images with AI-powered text behind image effects. Create stunning designs in seconds with our advanced tool.",
    "image": "https://text-behind-image.io/article-image.jpg",
    "author": {
      "@type": "Organization",
      "name": "Text Behind Image Team"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Text Behind Image",
      "logo": {
        "@type": "ImageObject",
        "url": "https://text-behind-image.io/logo.png"
      }
    },
    "datePublished": "2024-01-15",
    "dateModified": "2025-01-15",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://text-behind-image.io"
    },
    "keywords": [
      "text behind image",
      "AI text effects",
      "image text overlay",
      "design tool",
      "social media design"
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(howToData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleData),
        }}
      />
    </>
  );
}
