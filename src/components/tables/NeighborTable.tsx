import { Typography } from "@material-tailwind/react";

interface NeighborType{
    id: number, 
    first_name: string,
    second_name: string,
    last_name:string,
    ci:string,
    phone_number:string,
    email:string
}

type NeighborTableProps = {
    tableData: NeighborType[]
}

const TABLE_HEAD = ["Id", "Primer Nombre", "Segundo Nombre", "Apellidos", "CI",  "Celular", "Correo"];

const NeighborTable: React.FC<NeighborTableProps> = ({tableData}) => {

    const TABLE_ROWS = tableData
    return (
        <>
            <table className="w-full min-w-max table-auto text-left">
                <thead>
                <tr>
                    {TABLE_HEAD.map((head) => (
                    <th
                        key={head}
                        className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                    >
                        <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                        >
                        {head}
                        </Typography>
                    </th>
                    ))}
                </tr>
            </thead>
            <tbody>
            {
                TABLE_ROWS.map(({ id, first_name, second_name, last_name, ci, phone_number, email }, index) => {
                    const isLast = index === TABLE_ROWS.length - 1;
                    const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
    
                    return (
                        <tr key={index}>
                            <td className={classes}>
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal"
                                >
                                    {id}
                                </Typography>
                            </td>
                            <td className={classes}>
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal"
                                >
                                    {first_name}
                                </Typography>
                            </td>
                            <td className={classes}>
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal"
                                >
                                    {second_name}
                                </Typography>
                            </td>
                            <td className={classes}>
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal"
                                >
                                    {last_name}
                                </Typography>
                            </td>
                            <td className={classes}>
                                <Typography
                                    // as="a"
                                    // href="#"
                                    variant="small"
                                    color="blue-gray"
                                    className="font-medium"
                                >
                                    {ci}
                                </Typography>
                            </td>
                            <td className={classes}>
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal"
                                >
                                    {phone_number}
                                </Typography>
                            </td>
                            <td className={classes}>
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal"
                                >
                                    {email}
                                </Typography>
                            </td>
                        </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
}
 
export default NeighborTable;