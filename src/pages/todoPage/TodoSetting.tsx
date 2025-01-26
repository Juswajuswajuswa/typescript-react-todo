import Button from "../../components/Button";


export default function TodoSetting() {
  return (
    <div className="absolute z-40 h-[100px] w-[90px] right-0 rounded-[5px] bg-white">
      <div className="flex flex-col w-full gap-1 p-2">
        <Button title="Modify" />
        <Button title="Remove"/>
      </div>
    </div>
  );
}
