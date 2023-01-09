
const Tecnolgies = ({ files }: any) => {
  return (
    <div className="tenologies">
      {files.map((file: string, index: number) => (
        <div key={index} className="tenology">
          <img src={file} alt="" />
        </div>
      ))}
    </div>
  );
};

export default Tecnolgies;
