import { useState } from 'react';
import { Heart, Filter, ChevronLeft, ChevronRight, MapPin, Eye } from 'lucide-react';
import ListingModal from './ListingModal';
import FiltersModal from './FiltersModal';

interface FeedTabProps {
  fontSize?: string;
  onNavigateToChat?: (listing: any, contributorName: string) => void;
}

const FeedTab = ({ fontSize = 'sm', onNavigateToChat }: FeedTabProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedListing, setSelectedListing] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [bookmarkedItems, setBookmarkedItems] = useState(new Set());
  const [filters, setFilters] = useState({
    style: '',
    color: '',
    type: '',
    radius: 25,
    showFavoritesOnly: false
  });

  // Expanded mock data for clothing listings with 80+ items across multiple pages
  const mockListings = [
    // Page 1 (1-16)
    {
      id: 1,
      title: 'Vintage Denim Jacket',
      image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=400&fit=crop',
      location: 'Brooklyn, NY',
      size: 'M',
      style: 'Vintage',
      color: 'Blue',
      type: 'Jacket',
      distance: 2,
      contributor: {
        name: 'Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
        rating: 4.8,
        totalDonations: 23
      }
    },
    {
      id: 2,
      title: 'Cozy Knit Sweater',
      image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=400&fit=crop',
      location: 'Manhattan, NY',
      size: 'L',
      style: 'Casual',
      color: 'White',
      type: 'Sweater',
      distance: 5,
      contributor: {
        name: 'Mike Chen',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        rating: 4.6,
        totalDonations: 15
      }
    },
    {
      id: 3,
      title: 'Floral Summer Dress',
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop',
      location: 'Queens, NY',
      size: 'S',
      style: 'Casual',
      color: 'Red',
      type: 'Dress',
      distance: 8,
      contributor: {
        name: 'Emma Davis',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
        rating: 4.9,
        totalDonations: 31
      }
    },
    {
      id: 4,
      title: 'Designer Jeans',
      image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop',
      location: 'Bronx, NY',
      size: 'M',
      style: 'Trendy',
      color: 'Blue',
      type: 'Jeans',
      distance: 12,
      contributor: {
        name: 'Alex Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
        rating: 4.7,
        totalDonations: 18
      }
    },
    {
      id: 5,
      title: 'Leather Ankle Boots',
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop',
      location: 'Brooklyn, NY',
      size: 'L',
      style: 'Formal',
      color: 'Black',
      type: 'Shoes',
      distance: 3,
      contributor: {
        name: 'Jamie Kim',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        rating: 4.5,
        totalDonations: 12
      }
    },
    {
      id: 6,
      title: 'Silk Blouse',
      image: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=400&h=400&fit=crop',
      location: 'Manhattan, NY',
      size: 'S',
      style: 'Formal',
      color: 'White',
      type: 'Shirt',
      distance: 6,
      contributor: {
        name: 'Lisa Park',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
        rating: 4.8,
        totalDonations: 27
      }
    },
    {
      id: 7,
      title: 'Wool Coat',
      image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400&h=400&fit=crop',
      location: 'Queens, NY',
      size: 'M',
      style: 'Formal',
      color: 'Black',
      type: 'Jacket',
      distance: 9,
      contributor: {
        name: 'David Wilson',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
        rating: 4.6,
        totalDonations: 20
      }
    },
    {
      id: 8,
      title: 'Bohemian Skirt',
      image: 'https://images.unsplash.com/photo-1583496661160-fb5886a13d77?w=400&h=400&fit=crop',
      location: 'Brooklyn, NY',
      size: 'L',
      style: 'Bohemian',
      color: 'Purple',
      type: 'Skirt',
      distance: 4,
      contributor: {
        name: 'Maria Garcia',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
        rating: 4.7,
        totalDonations: 16
      }
    },
    {
      id: 9,
      title: 'Athletic Shorts',
      image: 'https://images.unsplash.com/photo-1506629905607-c60f40813d0d?w=400&h=400&fit=crop',
      location: 'Bronx, NY',
      size: 'M',
      style: 'Sporty',
      color: 'Gray',
      type: 'Shorts',
      distance: 11,
      contributor: {
        name: 'Tom Brown',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        rating: 4.4,
        totalDonations: 9
      }
    },
    {
      id: 10,
      title: 'Vintage Band T-Shirt',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
      location: 'Manhattan, NY',
      size: 'L',
      style: 'Vintage',
      color: 'Black',
      type: 'Shirt',
      distance: 7,
      contributor: {
        name: 'Chris Lee',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
        rating: 4.9,
        totalDonations: 35
      }
    },
    {
      id: 11,
      title: 'Formal Blazer',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      location: 'Brooklyn, NY',
      size: 'M',
      style: 'Formal',
      color: 'Black',
      type: 'Jacket',
      distance: 5,
      contributor: {
        name: 'Rachel Green',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
        rating: 4.8,
        totalDonations: 22
      }
    },
    {
      id: 12,
      title: 'Casual Chinos',
      image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=400&fit=crop',
      location: 'Queens, NY',
      size: 'L',
      style: 'Casual',
      color: 'Brown',
      type: 'Pants',
      distance: 10,
      contributor: {
        name: 'Kevin Zhang',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        rating: 4.5,
        totalDonations: 14
      }
    },
    {
      id: 13,
      title: 'Statement Necklace',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop',
      location: 'Manhattan, NY',
      size: 'S',
      style: 'Trendy',
      color: 'Green',
      type: 'Accessories',
      distance: 8,
      contributor: {
        name: 'Sophie Turner',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
        rating: 4.6,
        totalDonations: 19
      }
    },
    {
      id: 14,
      title: 'Running Sneakers',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
      location: 'Bronx, NY',
      size: 'M',
      style: 'Sporty',
      color: 'White',
      type: 'Shoes',
      distance: 13,
      contributor: {
        name: 'Marcus Johnson',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
        rating: 4.7,
        totalDonations: 25
      }
    },
    {
      id: 15,
      title: 'Maxi Dress',
      image: 'https://images.unsplash.com/photo-1566479179817-c0b5b4b4b1e5?w=400&h=400&fit=crop',
      location: 'Brooklyn, NY',
      size: 'L',
      style: 'Bohemian',
      color: 'Yellow',
      type: 'Dress',
      distance: 6,
      contributor: {
        name: 'Anna Williams',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
        rating: 4.9,
        totalDonations: 33
      }
    },
    {
      id: 16,
      title: 'Cardigan Sweater',
      image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=400&fit=crop',
      location: 'Queens, NY',
      size: 'S',
      style: 'Casual',
      color: 'Pink',
      type: 'Sweater',
      distance: 9,
      contributor: {
        name: 'Jennifer Lopez',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
        rating: 4.8,
        totalDonations: 28
      }
    },
    // Page 2 (17-32)
    {
      id: 17,
      title: 'Striped Polo Shirt',
      image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&h=400&fit=crop',
      location: 'Manhattan, NY',
      size: 'M',
      style: 'Casual',
      color: 'Blue',
      type: 'Shirt',
      distance: 4,
      contributor: {
        name: 'Robert Kim',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        rating: 4.6,
        totalDonations: 17
      }
    },
    {
      id: 18,
      title: 'Pleated Mini Skirt',
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop',
      location: 'Brooklyn, NY',
      size: 'S',
      style: 'Trendy',
      color: 'Black',
      type: 'Skirt',
      distance: 7,
      contributor: {
        name: 'Olivia Martinez',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
        rating: 4.7,
        totalDonations: 21
      }
    },
    {
      id: 19,
      title: 'Denim Overalls',
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop',
      location: 'Queens, NY',
      size: 'L',
      style: 'Casual',
      color: 'Blue',
      type: 'Pants',
      distance: 11,
      contributor: {
        name: 'Tyler Johnson',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
        rating: 4.5,
        totalDonations: 13
      }
    },
    {
      id: 20,
      title: 'Cashmere Scarf',
      image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400&h=400&fit=crop',
      location: 'Manhattan, NY',
      size: 'S',
      style: 'Formal',
      color: 'Gray',
      type: 'Accessories',
      distance: 5,
      contributor: {
        name: 'Grace Chen',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
        rating: 4.9,
        totalDonations: 29
      }
    },
    {
      id: 21,
      title: 'Hiking Boots',
      image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=400&fit=crop',
      location: 'Bronx, NY',
      size: 'M',
      style: 'Sporty',
      color: 'Brown',
      type: 'Shoes',
      distance: 14,
      contributor: {
        name: 'Daniel Park',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        rating: 4.4,
        totalDonations: 11
      }
    },
    {
      id: 22,
      title: 'Wrap Dress',
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop',
      location: 'Brooklyn, NY',
      size: 'M',
      style: 'Formal',
      color: 'Red',
      type: 'Dress',
      distance: 6,
      contributor: {
        name: 'Isabella Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
        rating: 4.8,
        totalDonations: 26
      }
    },
    {
      id: 23,
      title: 'Bomber Jacket',
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop',
      location: 'Queens, NY',
      size: 'L',
      style: 'Trendy',
      color: 'Green',
      type: 'Jacket',
      distance: 9,
      contributor: {
        name: 'Nathan Lee',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
        rating: 4.6,
        totalDonations: 18
      }
    },
    {
      id: 24,
      title: 'Yoga Leggings',
      image: 'https://images.unsplash.com/photo-1506629905607-c60f40813d0d?w=400&h=400&fit=crop',
      location: 'Manhattan, NY',
      size: 'S',
      style: 'Sporty',
      color: 'Black',
      type: 'Pants',
      distance: 3,
      contributor: {
        name: 'Sophia Wang',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
        rating: 4.7,
        totalDonations: 22
      }
    },
    {
      id: 25,
      title: 'Flannel Shirt',
      image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=400&fit=crop',
      location: 'Brooklyn, NY',
      size: 'M',
      style: 'Casual',
      color: 'Red',
      type: 'Shirt',
      distance: 8,
      contributor: {
        name: 'Ethan Brown',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        rating: 4.5,
        totalDonations: 15
      }
    },
    {
      id: 26,
      title: 'Pencil Skirt',
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop',
      location: 'Queens, NY',
      size: 'S',
      style: 'Formal',
      color: 'Black',
      type: 'Skirt',
      distance: 12,
      contributor: {
        name: 'Ava Davis',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
        rating: 4.8,
        totalDonations: 24
      }
    },
    {
      id: 27,
      title: 'Canvas Sneakers',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
      location: 'Bronx, NY',
      size: 'L',
      style: 'Casual',
      color: 'White',
      type: 'Shoes',
      distance: 15,
      contributor: {
        name: 'Lucas Martinez',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
        rating: 4.4,
        totalDonations: 10
      }
    },
    {
      id: 28,
      title: 'Turtleneck Sweater',
      image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=400&fit=crop',
      location: 'Manhattan, NY',
      size: 'M',
      style: 'Formal',
      color: 'Gray',
      type: 'Sweater',
      distance: 4,
      contributor: {
        name: 'Mia Thompson',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
        rating: 4.9,
        totalDonations: 32
      }
    },
    {
      id: 29,
      title: 'Cargo Pants',
      image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=400&fit=crop',
      location: 'Brooklyn, NY',
      size: 'L',
      style: 'Casual',
      color: 'Green',
      type: 'Pants',
      distance: 7,
      contributor: {
        name: 'Jackson Wilson',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        rating: 4.6,
        totalDonations: 19
      }
    },
    {
      id: 30,
      title: 'Cocktail Dress',
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop',
      location: 'Queens, NY',
      size: 'S',
      style: 'Formal',
      color: 'Purple',
      type: 'Dress',
      distance: 10,
      contributor: {
        name: 'Charlotte Garcia',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
        rating: 4.7,
        totalDonations: 23
      }
    },
    {
      id: 31,
      title: 'Baseball Cap',
      image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=400&fit=crop',
      location: 'Manhattan, NY',
      size: 'M',
      style: 'Casual',
      color: 'Blue',
      type: 'Accessories',
      distance: 6,
      contributor: {
        name: 'Aiden Kim',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
        rating: 4.5,
        totalDonations: 14
      }
    },
    {
      id: 32,
      title: 'Trench Coat',
      image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400&h=400&fit=crop',
      location: 'Bronx, NY',
      size: 'M',
      style: 'Formal',
      color: 'Brown',
      type: 'Jacket',
      distance: 13,
      contributor: {
        name: 'Harper Lee',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
        rating: 4.8,
        totalDonations: 27
      }
    },
    // Page 3 (33-48)
    {
      id: 33,
      title: 'Graphic Hoodie',
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop',
      location: 'Brooklyn, NY',
      size: 'L',
      style: 'Casual',
      color: 'Gray',
      type: 'Sweater',
      distance: 5,
      contributor: {
        name: 'Mason Davis',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        rating: 4.6,
        totalDonations: 16
      }
    },
    {
      id: 34,
      title: 'High Heels',
      image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=400&fit=crop',
      location: 'Manhattan, NY',
      size: 'S',
      style: 'Formal',
      color: 'Black',
      type: 'Shoes',
      distance: 3,
      contributor: {
        name: 'Ella Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
        rating: 4.9,
        totalDonations: 30
      }
    },
    {
      id: 35,
      title: 'Denim Shorts',
      image: 'https://images.unsplash.com/photo-1506629905607-c60f40813d0d?w=400&h=400&fit=crop',
      location: 'Queens, NY',
      size: 'M',
      style: 'Casual',
      color: 'Blue',
      type: 'Shorts',
      distance: 9,
      contributor: {
        name: 'Logan Wilson',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
        rating: 4.4,
        totalDonations: 12
      }
    },
    {
      id: 36,
      title: 'Silk Scarf',
      image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400&h=400&fit=crop',
      location: 'Brooklyn, NY',
      size: 'S',
      style: 'Formal',
      color: 'Red',
      type: 'Accessories',
      distance: 8,
      contributor: {
        name: 'Avery Chen',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
        rating: 4.7,
        totalDonations: 21
      }
    },
    {
      id: 37,
      title: 'Windbreaker',
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop',
      location: 'Bronx, NY',
      size: 'L',
      style: 'Sporty',
      color: 'Yellow',
      type: 'Jacket',
      distance: 14,
      contributor: {
        name: 'Carter Martinez',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        rating: 4.5,
        totalDonations: 13
      }
    },
    {
      id: 38,
      title: 'Midi Skirt',
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop',
      location: 'Manhattan, NY',
      size: 'M',
      style: 'Trendy',
      color: 'Pink',
      type: 'Skirt',
      distance: 4,
      contributor: {
        name: 'Luna Park',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
        rating: 4.8,
        totalDonations: 25
      }
    },
    {
      id: 39,
      title: 'Loafers',
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop',
      location: 'Queens, NY',
      size: 'M',
      style: 'Formal',
      color: 'Brown',
      type: 'Shoes',
      distance: 11,
      contributor: {
        name: 'Nova Kim',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
        rating: 4.6,
        totalDonations: 17
      }
    },
    {
      id: 40,
      title: 'Tank Top',
      image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&h=400&fit=crop',
      location: 'Brooklyn, NY',
      size: 'S',
      style: 'Casual',
      color: 'White',
      type: 'Shirt',
      distance: 6,
      contributor: {
        name: 'Kai Johnson',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        rating: 4.4,
        totalDonations: 11
      }
    },
    {
      id: 41,
      title: 'Puffer Vest',
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop',
      location: 'Manhattan, NY',
      size: 'L',
      style: 'Sporty',
      color: 'Black',
      type: 'Jacket',
      distance: 7,
      contributor: {
        name: 'River Davis',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
        rating: 4.7,
        totalDonations: 20
      }
    },
    {
      id: 42,
      title: 'Sundress',
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop',
      location: 'Bronx, NY',
      size: 'M',
      style: 'Casual',
      color: 'Yellow',
      type: 'Dress',
      distance: 12,
      contributor: {
        name: 'Sage Wilson',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
        rating: 4.8,
        totalDonations: 26
      }
    },
    {
      id: 43,
      title: 'Beanie Hat',
      image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=400&fit=crop',
      location: 'Queens, NY',
      size: 'S',
      style: 'Casual',
      color: 'Gray',
      type: 'Accessories',
      distance: 10,
      contributor: {
        name: 'Phoenix Lee',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
        rating: 4.5,
        totalDonations: 14
      }
    },
    {
      id: 44,
      title: 'Sweatpants',
      image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=400&fit=crop',
      location: 'Brooklyn, NY',
      size: 'L',
      style: 'Casual',
      color: 'Gray',
      type: 'Pants',
      distance: 5,
      contributor: {
        name: 'Rowan Chen',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        rating: 4.6,
        totalDonations: 18
      }
    },
    {
      id: 45,
      title: 'Blazer Dress',
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop',
      location: 'Manhattan, NY',
      size: 'S',
      style: 'Formal',
      color: 'Black',
      type: 'Dress',
      distance: 3,
      contributor: {
        name: 'Skylar Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
        rating: 4.9,
        totalDonations: 31
      }
    },
    {
      id: 46,
      title: 'Flip Flops',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
      location: 'Queens, NY',
      size: 'M',
      style: 'Casual',
      color: 'Blue',
      type: 'Shoes',
      distance: 9,
      contributor: {
        name: 'Indigo Martinez',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
        rating: 4.4,
        totalDonations: 10
      }
    },
    {
      id: 47,
      title: 'Crop Top',
      image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&h=400&fit=crop',
      location: 'Bronx, NY',
      size: 'S',
      style: 'Trendy',
      color: 'Pink',
      type: 'Shirt',
      distance: 13,
      contributor: {
        name: 'Violet Kim',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
        rating: 4.7,
        totalDonations: 22
      }
    },
    {
      id: 48,
      title: 'Leather Jacket',
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop',
      location: 'Brooklyn, NY',
      size: 'M',
      style: 'Vintage',
      color: 'Black',
      type: 'Jacket',
      distance: 7,
      contributor: {
        name: 'Orion Park',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        rating: 4.8,
        totalDonations: 24
      }
    },
    // Page 4 (49-64)
    {
      id: 49,
      title: 'Polo Dress',
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop',
      location: 'Manhattan, NY',
      size: 'L',
      style: 'Casual',
      color: 'Green',
      type: 'Dress',
      distance: 4,
      contributor: {
        name: 'Aspen Wilson',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
        rating: 4.6,
        totalDonations: 19
      }
    },
    {
      id: 50,
      title: 'Combat Boots',
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop',
      location: 'Queens, NY',
      size: 'M',
      style: 'Trendy',
      color: 'Black',
      type: 'Shoes',
      distance: 11,
      contributor: {
        name: 'Sage Thompson',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
        rating: 4.5,
        totalDonations: 15
      }
    },
    {
      id: 51,
      title: 'Henley Shirt',
      image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&h=400&fit=crop',
      location: 'Brooklyn, NY',
      size: 'L',
      style: 'Casual',
      color: 'White',
      type: 'Shirt',
      distance: 6,
      contributor: {
        name: 'River Garcia',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        rating: 4.7,
        totalDonations: 21
      }
    },
    {
      id: 52,
      title: 'Wide Leg Pants',
      image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=400&fit=crop',
      location: 'Bronx, NY',
      size: 'S',
      style: 'Trendy',
      color: 'Brown',
      type: 'Pants',
      distance: 14,
      contributor: {
        name: 'Ocean Lee',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
        rating: 4.8,
        totalDonations: 27
      }
    },
    {
      id: 53,
      title: 'Bucket Hat',
      image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=400&fit=crop',
      location: 'Manhattan, NY',
      size: 'M',
      style: 'Casual',
      color: 'Yellow',
      type: 'Accessories',
      distance: 5,
      contributor: {
        name: 'Storm Davis',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
        rating: 4.4,
        totalDonations: 12
      }
    },
    {
      id: 54,
      title: 'Bodysuit',
      image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&h=400&fit=crop',
      location: 'Queens, NY',
      size: 'S',
      style: 'Trendy',
      color: 'Black',
      type: 'Shirt',
      distance: 10,
      contributor: {
        name: 'Aurora Martinez',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
        rating: 4.9,
        totalDonations: 33
      }
    },
    {
      id: 55,
      title: 'Pea Coat',
      image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400&h=400&fit=crop',
      location: 'Brooklyn, NY',
      size: 'M',
      style: 'Formal',
      color: 'Navy',
      type: 'Jacket',
      distance: 8,
      contributor: {
        name: 'Blaze Kim',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        rating: 4.6,
        totalDonations: 18
      }
    },
    {
      id: 56,
      title: 'Slip Dress',
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop',
      location: 'Manhattan, NY',
      size: 'L',
      style: 'Formal',
      color: 'Silver',
      type: 'Dress',
      distance: 3,
      contributor: {
        name: 'Echo Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
        rating: 4.8,
        totalDonations: 25
      }
    },
    {
      id: 57,
      title: 'Oxford Shoes',
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop',
      location: 'Bronx, NY',
      size: 'M',
      style: 'Formal',
      color: 'Brown',
      type: 'Shoes',
      distance: 12,
      contributor: {
        name: 'Zephyr Wilson',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
        rating: 4.5,
        totalDonations: 16
      }
    },
    {
      id: 58,
      title: 'Mesh Top',
      image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&h=400&fit=crop',
      location: 'Queens, NY',
      size: 'S',
      style: 'Trendy',
      color: 'Black',
      type: 'Shirt',
      distance: 9,
      contributor: {
        name: 'Iris Chen',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
        rating: 4.7,
        totalDonations: 23
      }
    },
    {
      id: 59,
      title: 'Track Jacket',
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop',
      location: 'Brooklyn, NY',
      size: 'L',
      style: 'Sporty',
      color: 'Blue',
      type: 'Jacket',
      distance: 7,
      contributor: {
        name: 'Atlas Park',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        rating: 4.6,
        totalDonations: 20
      }
    },
    {
      id: 60,
      title: 'Tulle Skirt',
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop',
      location: 'Manhattan, NY',
      size: 'M',
      style: 'Formal',
      color: 'Pink',
      type: 'Skirt',
      distance: 4,
      contributor: {
        name: 'Nova Johnson',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
        rating: 4.9,
        totalDonations: 29
      }
    },
    {
      id: 61,
      title: 'Espadrilles',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
      location: 'Queens, NY',
      size: 'S',
      style: 'Casual',
      color: 'Brown',
      type: 'Shoes',
      distance: 11,
      contributor: {
        name: 'Sage Martinez',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
        rating: 4.4,
        totalDonations: 13
      }
    },
    {
      id: 62,
      title: 'Utility Vest',
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop',
      location: 'Bronx, NY',
      size: 'L',
      style: 'Casual',
      color: 'Green',
      type: 'Jacket',
      distance: 13,
      contributor: {
        name: 'River Lee',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        rating: 4.7,
        totalDonations: 22
      }
    },
    {
      id: 63,
      title: 'Halter Top',
      image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&h=400&fit=crop',
      location: 'Brooklyn, NY',
      size: 'S',
      style: 'Trendy',
      color: 'Red',
      type: 'Shirt',
      distance: 6,
      contributor: {
        name: 'Phoenix Davis',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
        rating: 4.8,
        totalDonations: 26
      }
    },
    {
      id: 64,
      title: 'Peacoat',
      image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400&h=400&fit=crop',
      location: 'Manhattan, NY',
      size: 'M',
      style: 'Formal',
      color: 'Black',
      type: 'Jacket',
      distance: 5,
      contributor: {
        name: 'Luna Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
        rating: 4.9,
        totalDonations: 31
      }
    },
    // Page 5 (65-80)
    {
      id: 65,
      title: 'Romper',
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop',
      location: 'Queens, NY',
      size: 'M',
      style: 'Casual',
      color: 'Blue',
      type: 'Dress',
      distance: 10,
      contributor: {
        name: 'Orion Kim',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
        rating: 4.5,
        totalDonations: 17
      }
    },
    {
      id: 66,
      title: 'Platform Sandals',
      image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=400&fit=crop',
      location: 'Brooklyn, NY',
      size: 'L',
      style: 'Trendy',
      color: 'Black',
      type: 'Shoes',
      distance: 8,
      contributor: {
        name: 'Sage Wilson',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
        rating: 4.6,
        totalDonations: 19
      }
    },
    {
      id: 67,
      title: 'Varsity Jacket',
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop',
      location: 'Bronx, NY',
      size: 'L',
      style: 'Casual',
      color: 'Red',
      type: 'Jacket',
      distance: 14,
      contributor: {
        name: 'River Chen',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        rating: 4.7,
        totalDonations: 21
      }
    },
    {
      id: 68,
      title: 'Camisole',
      image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&h=400&fit=crop',
      location: 'Manhattan, NY',
      size: 'S',
      style: 'Formal',
      color: 'White',
      type: 'Shirt',
      distance: 3,
      contributor: {
        name: 'Aurora Park',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
        rating: 4.8,
        totalDonations: 24
      }
    },
    {
      id: 69,
      title: 'Cargo Shorts',
      image: 'https://images.unsplash.com/photo-1506629905607-c60f40813d0d?w=400&h=400&fit=crop',
      location: 'Queens, NY',
      size: 'M',
      style: 'Casual',
      color: 'Green',
      type: 'Shorts',
      distance: 9,
      contributor: {
        name: 'Storm Martinez',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
        rating: 4.4,
        totalDonations: 14
      }
    },
    {
      id: 70,
      title: 'Clutch Bag',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
      location: 'Brooklyn, NY',
      size: 'S',
      style: 'Formal',
      color: 'Black',
      type: 'Accessories',
      distance: 7,
      contributor: {
        name: 'Echo Johnson',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
        rating: 4.9,
        totalDonations: 32
      }
    },
    {
      id: 71,
      title: 'Puffer Jacket',
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop',
      location: 'Manhattan, NY',
      size: 'L',
      style: 'Sporty',
      color: 'Blue',
      type: 'Jacket',
      distance: 5,
      contributor: {
        name: 'Blaze Lee',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        rating: 4.6,
        totalDonations: 18
      }
    },
    {
      id: 72,
      title: 'A-Line Skirt',
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop',
      location: 'Bronx, NY',
      size: 'M',
      style: 'Formal',
      color: 'Navy',
      type: 'Skirt',
      distance: 12,
      contributor: {
        name: 'Iris Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
        rating: 4.7,
        totalDonations: 23
      }
    },
    {
      id: 73,
      title: 'Boat Shoes',
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop',
      location: 'Queens, NY',
      size: 'M',
      style: 'Casual',
      color: 'Brown',
      type: 'Shoes',
      distance: 11,
      contributor: {
        name: 'Atlas Davis',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
        rating: 4.5,
        totalDonations: 15
      }
    },
    {
      id: 74,
      title: 'Tube Top',
      image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&h=400&fit=crop',
      location: 'Brooklyn, NY',
      size: 'S',
      style: 'Trendy',
      color: 'Pink',
      type: 'Shirt',
      distance: 6,
      contributor: {
        name: 'Nova Wilson',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
        rating: 4.8,
        totalDonations: 27
      }
    },
    {
      id: 75,
      title: 'Duster Coat',
      image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400&h=400&fit=crop',
      location: 'Manhattan, NY',
      size: 'L',
      style: 'Bohemian',
      color: 'Brown',
      type: 'Jacket',
      distance: 4,
      contributor: {
        name: 'Zephyr Chen',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        rating: 4.6,
        totalDonations: 20
      }
    },
    {
      id: 76,
      title: 'Shift Dress',
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop',
      location: 'Queens, NY',
      size: 'M',
      style: 'Formal',
      color: 'Green',
      type: 'Dress',
      distance: 10,
      contributor: {
        name: 'Sage Kim',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
        rating: 4.9,
        totalDonations: 30
      }
    },
    {
      id: 77,
      title: 'Moccasins',
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop',
      location: 'Bronx, NY',
      size: 'L',
      style: 'Casual',
      color: 'Brown',
      type: 'Shoes',
      distance: 13,
      contributor: {
        name: 'River Park',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
        rating: 4.4,
        totalDonations: 12
      }
    },
    {
      id: 78,
      title: 'Kimono',
      image: 'https://images.unsplash.com/photo-1583496661160-fb5886a13d77?w=400&h=400&fit=crop',
      location: 'Brooklyn, NY',
      size: 'S',
      style: 'Bohemian',
      color: 'Purple',
      type: 'Jacket',
      distance: 8,
      contributor: {
        name: 'Aurora Martinez',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
        rating: 4.7,
        totalDonations: 25
      }
    },
    {
      id: 79,
      title: 'Palazzo Pants',
      image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=400&fit=crop',
      location: 'Manhattan, NY',
      size: 'M',
      style: 'Bohemian',
      color: 'Black',
      type: 'Pants',
      distance: 5,
      contributor: {
        name: 'Storm Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        rating: 4.8,
        totalDonations: 26
      }
    },
    {
      id: 80,
      title: 'Fedora Hat',
      image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=400&fit=crop',
      location: 'Queens, NY',
      size: 'M',
      style: 'Vintage',
      color: 'Black',
      type: 'Accessories',
      distance: 9,
      contributor: {
        name: 'Echo Lee',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
        rating: 4.9,
        totalDonations: 34
      }
    }
  ];

  const itemsPerPage = 16;
  
  // Filter listings based on active filters
  const filteredListings = mockListings.filter(listing => {
    if (filters.showFavoritesOnly && !bookmarkedItems.has(listing.id)) {
      return false;
    }
    if (filters.radius && listing.distance > filters.radius) {
      return false;
    }
    if (filters.style && listing.style !== filters.style) {
      return false;
    }
    if (filters.color && listing.color !== filters.color) {
      return false;
    }
    if (filters.type && listing.type !== filters.type) {
      return false;
    }
    return true;
  });

  const totalPages = Math.ceil(filteredListings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentListings = filteredListings.slice(startIndex, startIndex + itemsPerPage);

  const toggleBookmark = (id) => {
    const newBookmarks = new Set(bookmarkedItems);
    if (newBookmarks.has(id)) {
      newBookmarks.delete(id);
    } else {
      newBookmarks.add(id);
    }
    setBookmarkedItems(newBookmarks);
  };

  const getFontSizeClass = () => {
    const fontSizeMap = {
      xs: 'text-xs-accessible',
      sm: 'text-sm-accessible', 
      base: 'text-base-accessible',
      lg: 'text-lg-accessible',
      xl: 'text-xl-accessible'
    };
    return fontSizeMap[fontSize as keyof typeof fontSizeMap] || 'text-sm-accessible';
  };

  return (
    <div className="h-full flex flex-col p-4">
      {/* Filters Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className={`${getFontSizeClass()} font-semibold text-gray-800`}>Available Items</h2>
        <button
          onClick={() => setShowFilters(true)}
          className="flex items-center space-x-2 bg-[#bad3de] text-[#132c0b] px-3 py-2 rounded-full shadow-sm border border-[#36723f] border-opacity-30 hover:bg-[#a8c8d4] transition-colors"
        >
          <Filter size={16} className="text-[#132c0b]" />
          <span className={`${getFontSizeClass()} text-[#132c0b]`}>Filters</span>
        </button>
      </div>

      {/* Active Filters Display */}
      {(filters.style || filters.color || filters.type || filters.showFavoritesOnly) && (
        <div className="flex flex-wrap gap-2 mb-4">
          {filters.showFavoritesOnly && (
            <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs">
              ❤️ Favorites Only
            </span>
          )}
          {filters.style && (
            <span className="bg-[#36723f] bg-opacity-10 text-[#36723f] px-2 py-1 rounded-full text-xs">
              {filters.style}
            </span>
          )}
          {filters.color && (
            <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
              {filters.color}
            </span>
          )}
          {filters.type && (
            <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs">
              {filters.type}
            </span>
          )}
        </div>
      )}

      {/* Listings Grid */}
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-2 gap-3 pb-4">
          {currentListings.map((listing) => (
            <div
              key={listing.id}
              className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-all duration-200 hover:scale-[1.02]"
            >
              <div className="relative">
                <img
                  src={listing.image}
                  alt={listing.title}
                  className="w-full h-40 object-cover cursor-pointer"
                  onClick={() => setSelectedListing(listing)}
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleBookmark(listing.id);
                  }}
                  className="absolute top-2 right-2 p-2 bg-white/80 rounded-full shadow-sm hover:bg-white transition-colors"
                >
                  <Heart
                    size={16}
                    className={bookmarkedItems.has(listing.id) 
                      ? 'fill-red-500 text-red-500' 
                      : 'text-gray-600 hover:text-red-500'
                    }
                  />
                </button>
                <div className="absolute bottom-2 left-2 bg-black/60 text-white px-2 py-1 rounded-full text-xs flex items-center space-x-1">
                  <MapPin size={10} />
                  <span>{listing.distance}mi</span>
                </div>
              </div>
              <div className="p-3">
                <h3 className={`${getFontSizeClass()} font-medium text-gray-800 mb-1 truncate`}>{listing.title}</h3>
                <p className={`${getFontSizeClass()} text-gray-500 mb-2`}>{listing.location}</p>
                <div className="flex justify-between items-center">
                  <span className={`bg-[#36723f] bg-opacity-10 text-[#36723f] px-2 py-1 rounded-full ${getFontSizeClass()}`}>
                    Size {listing.size}
                  </span>
                  <button
                    onClick={() => setSelectedListing(listing)}
                    className="p-1 hover:bg-[#36723f] hover:bg-opacity-5 rounded-full transition-colors"
                  >
                    <Eye size={14} className="text-[#36723f]" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center space-x-4 pt-4 border-t border-gray-200">
        <button
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="flex items-center space-x-1 px-4 py-2 bg-[#bad3de] text-[#132c0b] rounded-full shadow-sm border border-[#36723f] border-opacity-30 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#a8c8d4] transition-colors"
        >
          <ChevronLeft size={16} />
          <span className="text-sm">Back</span>
        </button>
        
        <span className="text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
        
        <button
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="flex items-center space-x-1 px-4 py-2 bg-[#bad3de] text-[#132c0b] rounded-full shadow-sm border border-[#36723f] border-opacity-30 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#a8c8d4] transition-colors"
        >
          <span className="text-sm">Next</span>
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Modals */}
      {selectedListing && (
        <ListingModal
          listing={selectedListing}
          onClose={() => setSelectedListing(null)}
          isBookmarked={bookmarkedItems.has(selectedListing.id)}
          onToggleBookmark={() => toggleBookmark(selectedListing.id)}
          fontSize={fontSize}
          onNavigateToChat={onNavigateToChat}
        />
      )}

      {showFilters && (
        <FiltersModal
          filters={filters}
          onFiltersChange={setFilters}
          onClose={() => setShowFilters(false)}
        />
      )}
    </div>
  );
};

export default FeedTab;