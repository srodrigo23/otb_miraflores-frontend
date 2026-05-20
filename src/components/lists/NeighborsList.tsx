import { useMemo, useState } from "react";
import { Input, Card, List, ListItem, Typography, Chip } from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { NeighborType } from "../../interfaces/neighborsInterfaces";

export const NeighborList: React.FC<{ neighborsData: NeighborType[] }> = ({
  neighborsData,
}) => {

  const [searchTerm, setSearchTerm] = useState<string>('');
  
  const filteredData = useMemo(()=>{
    return neighborsData.filter((neigbor)=>{
      const fullName = `${neigbor.first_name} ${neigbor.second_name} ${neigbor.last_name} `;
      return fullName.includes(searchTerm.toLocaleLowerCase())
    })
  }, [searchTerm, neighborsData])

  return (
    <div className='w-1/3 border rounded-md'>
      <div className='flex pt-4 px-4 pb-1'>
        <Input
          label='Buscar ...'
          icon={<MagnifyingGlassIcon className='h-5 w-5' />}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          crossOrigin={undefined}
        />
      </div>

      <Card className='overflow-y-auto h-screen'>
        <List className='gap-0'>
          {filteredData.map((neighbor, index) => {
            return (
              <ListItem
                className='flex justify-between items-center border-t py-1'
                // selected={index == 0}
              >
                <p className='flex gap-4 items-center'>
                  <span className='text-sm'>{index + 1}</span>
                  <Typography
                    variant='paragraph'
                    className='font-semibold text-sm'
                  >
                    {`${neighbor.last_name} ${neighbor.first_name} ${neighbor.second_name}`}
                  </Typography>
                </p>
                <Chip value={123} color='red' />
              </ListItem>
            );
          })}
        </List>
      </Card>
    </div>
  );
};