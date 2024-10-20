export const EXAMPLE_BLOGS_DATA = [
  {
    id: "blog_01",
    image: "",
    title: "TorchGeo: An Introduction to Object Detection Example",
    content: `TorchGeo is a PyTorch domain library similar to torchvision, specialized for geospatial data. It offers datasets, samplers, transformations, and pre-trained models tailored for geospatial information. This tutorial will introduce an object detection example in TorchGeo.

    This example is based on the notebook torchgeo_object_detection_example.ipynb provided by Caleb Robinson from Microsoft AI for Good, with added explanations.

    GPU Selection
    Before starting the training, select Runtime > Change runtime type from the notebook’s top menu, then choose GPU from the Hardware accelerator menu and save. I subscribe to Colab Pro and used an A100 GPU.

    Installing TorchGeo
    TorchGeo installs only a set of essential dependencies by default with pip install torchgeo to keep the installation relatively lightweight. For a full installation that includes an optional set of dependencies, you can use pip install torchgeo[datasets].`,
    author: "Arup",
    avatar: "",
    createdAt: "20-08-2024 10:13:00",
    category: "Tech",
    likes: 10,
    comments: 5,
  },
];
