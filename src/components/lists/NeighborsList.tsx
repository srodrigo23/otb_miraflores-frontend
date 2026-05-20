import { useEffect, useMemo, useState } from "react";
import { Input, Card, List, ListItem, Typography, Chip, IconButton } from "@material-tailwind/react";
import { MagnifyingGlassIcon, XMarkIcon} from "@heroicons/react/24/outline";
import { NeighborType } from "../../interfaces/neighborsInterfaces";

export const NeighborList: React.FC<{ neighborsData: NeighborType[] }> = ({
  neighborsData,
}) => {

  const [searchTerm, setSearchTerm] = useState<string>('');
  
  const filteredData = useMemo(()=>{
    return neighborsData.filter((neigbor)=>{
      const fullName = `${neigbor.first_name} ${neigbor.second_name} ${neigbor.last_name}`.toLowerCase();
      return fullName.includes(searchTerm.toLocaleLowerCase())
    })
  }, [searchTerm, neighborsData])

  const [neighborSelected, setNeighborSelected] = useState<NeighborType | null>(null);

  useEffect(() => {
    // if (neighborSelected) {
    //   const stillExists = filteredData.find(n => n.id === neighborSelected.id);
    //   if (!stillExists) {
    //     setNeighborSelected(filteredData[0] ?? null);
    //   }
    // }
    // } else {
    //   setNeighborSelected(filteredData[0] ?? null);
    // }
  }, [filteredData]);

  return (
    <div className='w-1/3 border rounded-md'>
      <div className='flex gap-2 pt-4 px-4 pb-1'>
        <Input
          label='Buscar ...'
          icon={<MagnifyingGlassIcon className='h-5 w-5' />}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          crossOrigin={undefined}
        />
        {searchTerm ? (
          <IconButton variant="gradient" color="cyan" size="md" onClick={() => setSearchTerm('')}><XMarkIcon className="w-5 h-5"/></IconButton>
        ) : (
          <></>
        )}
      </div>

      {searchTerm ? (
        <Card className='overflow-y-auto max-h-40 min-h-16'>
          {filteredData.length > 0 ? (
            <List className='gap-0'>
              {filteredData.map((neighbor, index) => {
                return (
                  <ListItem
                    className='flex justify-between items-center border-t py-1'
                    selected={neighborSelected?.id === neighbor.id}
                    onClick={() => {
                      setSearchTerm('')
                      setNeighborSelected(neighbor);
                    }}
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
          ) : (
            <div className='flex items-center justify-center h-16'>
              <Typography variant="h5">No existe este nombre</Typography>
            </div>
          )}
        </Card>
      ) : (
        <></>
      )}
    </div>
  );
};