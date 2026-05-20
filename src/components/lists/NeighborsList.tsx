import { useMemo } from "react";
import { Input, Card, List, ListItem, Typography, Chip, IconButton } from "@material-tailwind/react";
import { MagnifyingGlassIcon, XMarkIcon} from "@heroicons/react/24/outline";
import { NeighborType } from "../../interfaces/neighborsInterfaces";

interface NeighborListProps {
  neighborsData: NeighborType[];
  searchTerm: string;
  onSearchChange: (value: string) => void;
  neighborSelected: NeighborType | null;
  onSelectNeighbor: (neighbor: NeighborType) => void;
}

export const NeighborList: React.FC<NeighborListProps> = ({
  neighborsData,
  searchTerm,
  onSearchChange,
  neighborSelected,
  onSelectNeighbor,
}) => {

  const filteredData = useMemo(() => {
    return neighborsData.filter((neighbor) => {
      const fullName = `${neighbor.first_name} ${neighbor.second_name} ${neighbor.last_name}`.toLowerCase();
      return fullName.includes(searchTerm.toLocaleLowerCase())
    })
  }, [searchTerm, neighborsData])

  return (
    <div className='relative w-full lg:w-1/3'>
      <div className='flex gap-2'>
        <Input
          label='Buscar ...'
          icon={<MagnifyingGlassIcon className='h-5 w-5' />}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          crossOrigin={undefined}
        />
        {searchTerm && (
          <IconButton variant="gradient" color="cyan" size="md" onClick={() => onSearchChange('')}>
            <XMarkIcon className="w-5 h-5" />
          </IconButton>
        )}
      </div>

      {searchTerm && (
        <Card className='absolute z-20 overflow-y-auto max-h-60 w-full mt-1'>
          {filteredData.length > 0 ? (
            <List className='gap-0'>
              {filteredData.map((neighbor, index) => (
                <ListItem
                  key={neighbor.id}
                  className='flex justify-between items-center border-t py-1'
                  selected={neighborSelected?.id === neighbor.id}
                  onClick={() => {
                    onSearchChange('')
                    onSelectNeighbor(neighbor);
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
              ))}
            </List>
          ) : (
            <div className='flex items-center justify-center h-16'>
              <Typography variant="h5">No existe este nombre</Typography>
            </div>
          )}
        </Card>
      )}
    </div>
  );
};
