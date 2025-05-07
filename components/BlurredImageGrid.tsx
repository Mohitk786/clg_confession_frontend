import ImageCard from "./ImageCard";


const BlurredImageGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
      {[
        { id: 1, caption: "Feeling Bold", interactions: 42 },
        { id: 2, caption: "Secret Crush", interactions: 78 },
        { id: 3, caption: "Looking for Attention", interactions: 36 },
        { id: 4, caption: "Late Night Confession", interactions: 54 },
        { id: 5, caption: "Campus Mystery", interactions: 63 },
        { id: 6, caption: "Dorm Room Secret", interactions: 29 },
      ].map((item) => (
       <ImageCard key={item.id} item={item}/>
      ))}
    </div>
  );
};

export default BlurredImageGrid;
