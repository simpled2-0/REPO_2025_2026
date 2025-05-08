(function () {
  const trials = [
    {
      label: "MICROSOFT",
      content: "A92gdLiyPS/u4bCOUOyjUumRkt5Y4c66DAWPrtaqYcYqoOdp2QhzVUlee7xhrQRLn1PODq3A9yMPSOefneQhAT0AAAB7eyJvcmlnaW4iOiJodHRwczovL2VhZ2xlcmNyYWZ0Lndpbjo0NDMiLCJmZWF0dXJlIjoiV2ViQXNzZW1ibHlKU1Byb21pc2VJbnRlZ3JhdGlvbiIsImV4cGlyeSI6MTc0ODYyOTgzNiwiaXNTdWJkb21haW4iOnRydWV9"
    },
    {
      label: "GOOGLE",
      content: "AqYxVIEjtXLwliq5fSqd+ZJN0ko5kmcKS++Ood3gL4Ni/mCyGEGlW12wQRiZQd/GQ+WqJi5LMnFHq0ju8jlRcQ0AAAB7eyJvcmlnaW4iOiJodHRwczovL2VhZ2xlcmNyYWZ0Lndpbjo0NDMiLCJmZWF0dXJlIjoiV2ViQXNzZW1ibHlKU1Byb21pc2VJbnRlZ3JhdGlvbiIsImV4cGlyeSI6MTc1MzE0MjQwMCwiaXNTdWJkb21haW4iOnRydWV9"
    }
  ];

  trials.forEach(trial => {
    const meta = document.createElement("meta");
    meta.httpEquiv = "origin-trial";
    meta.content = trial.content;
    meta.setAttribute("data-label", trial.label);
    document.head.appendChild(meta);
  });
})();
