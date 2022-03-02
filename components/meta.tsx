//https://gist.github.com/lancejpollard/1978404

const MetaTags = () => {
  return (
    <>
      <meta name="theme-color" content="#fc5277" />
      <meta name="apple-mobile-web-app-status-bar" content="#90cdf4" />

      <meta
        name="description"
        content="Generate Toggle Coins as you cycle through images and videos! Will you generate enough for maybe some Toggle Swag?!?!"
      />

      {/*google*/}
      <meta itemProp="name" content="Toggle" />
      <meta
        itemProp="description"
        content="Generate Toggle Coins as you cycle through images and videos! Will you generate enough for maybe some Toggle Swag?!?!"
      />
      {/* <meta itemProp="image" content="https://toggle.trevorbrixey.com/map.jpg" /> */}

      {/*facebook*/}
      <meta property="og:url" content="https://toggle.trevorbrixey.com" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Toggle" />
      <meta
        property="og:description"
        content="Generate Toggle Coins as you cycle through images and videos! Will you generate enough for maybe some Toggle Swag?!?!"
      />
      {/* <meta
        property="og:image"
        content="https://toggle.trevorbrixey.com/map.jpg"
      /> */}

      {/*twitter*/}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content="Toggle" />
      <meta
        name="twitter:description"
        content="Generate Toggle Coins as you cycle through images and videos! Will you generate enough for maybe some Toggle Swag?!?!"
      />
      {/* <meta
        name="twitter:image"
        content="https://toggle.trevorbrixey.com/map.jpg"
      />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:width" content="600" />
      <meta property="og:image:height" content="250" />
      <meta property="og:image:alt" content="The map of Toggle" /> */}
      <meta name="og:locale" content="en_US" />
    </>
  );
};

export default MetaTags;
